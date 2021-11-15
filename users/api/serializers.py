from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings
from django.contrib.auth.models import update_last_login
from django.core.exceptions import ObjectDoesNotExist

from users.models import ApplicationUser


class ApplicationUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplicationUser
        fields = ['id', 'username', 'email', 'is_active', 'is_staff', 'created', 'updated']
        read_only_field = ['is_active', 'is_staff', 'created', 'updated']


class StrippedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplicationUser
        fields = ['id', 'username']
        read_only_field = ['username']


class LoginSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data.update(ApplicationUserSerializer(self.user).data)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        if api_settings.UPDATE_LAST_LOGIN:
            update_last_login(None, self.user)

        return data


class RegisterSerializer(ApplicationUserSerializer):
    password = serializers.CharField(max_length=128, min_length=8, write_only=True, required=True)
    username = serializers.CharField(
        max_length=128,
        min_length=4,
        write_only=True,
        required=True,
        validators=[UniqueValidator(queryset=ApplicationUser.objects.all())]
    )
    email = serializers.EmailField(
        max_length=128,
        write_only=True,
        required=True,
        validators=[UniqueValidator(queryset=ApplicationUser.objects.all())]
    )

    class Meta:
        model = ApplicationUser
        fields = ['id', 'username', 'email', 'password', 'is_active', 'created', 'updated']

    def create(self, validated_data):
        try:
            user = ApplicationUser.objects.get(username=validated_data['username'])
        except ObjectDoesNotExist:
            user = ApplicationUser.objects.create_user(**validated_data)
        return user

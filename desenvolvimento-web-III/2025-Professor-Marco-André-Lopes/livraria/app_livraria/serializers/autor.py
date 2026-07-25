from rest_framework.serializers import ModelSerializer

from app_livraria.models import *

class autorSerializer(ModelSerializer):
    class Meta:
        model = Autor
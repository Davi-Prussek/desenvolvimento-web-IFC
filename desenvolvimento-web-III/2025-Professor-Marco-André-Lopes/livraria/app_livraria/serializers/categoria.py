from rest_framework.serializers import ModelSerializer

from app_livraria.models import *


class CategoriaSerializer(ModelSerializer):
    class Meta:
        model = Categoria
        fields = "__all__"
from rest_framework.serializers import ModelSerializer

from app_livraria.models import *

class EditoraSerializer(ModelSerializer):
    class Meta:
        model = Editora
        fields = "__all__"
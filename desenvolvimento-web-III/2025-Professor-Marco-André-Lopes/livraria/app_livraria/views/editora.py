from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from app_livraria.models.editora import Editora 
from app_livraria.serializers.editora import EditoraSerializer

class EditoraViewSet(ModelViewSet):
    queryset = Editora.objects.all()
    serializer_class = EditoraSerializer
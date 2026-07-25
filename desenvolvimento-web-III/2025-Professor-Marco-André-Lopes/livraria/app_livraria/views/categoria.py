from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from app_livraria.models.categoria import Categoria
from app_livraria.serializers.categoria import CategoriaSerializer

class CategoriaViewSet(ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [IsAuthenticated]
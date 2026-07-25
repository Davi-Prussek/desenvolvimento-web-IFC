from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from app_livraria.models.autor import Autor
from app_livraria.serializers.autor import autorSerializer

class autorViewSet(ModelViewSet):
    queryset = Autor.objects.all()
    serializer_class = autorSerializer
from rest_framework.serializers import ModelSerializer
from Garagem.models import   *

class MarcaSerializer(ModelSerializer):
    class Meta:
        model = Marca
        fields = '__all__'

class CategoriaSerializer(ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class AcessórioSerializer(ModelSerializer):
    class Meta:
        model = Acessório
        fields = '__all__'

class CorSerializer(ModelSerializer):
    class Meta:
        model = Cor
        fields = '__all__'

class VeículoSerializer(ModelSerializer):
    class Meta:
        model = Veículo
        fields = '__all__'
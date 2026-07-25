from django.db import models

# Create your models here.

class Marca(models.Model):
    nome = models.CharField(max_length=50)
    nacionalidade = models.CharField(max_length=50)
    def __str__(self):
        return self.nome.lower()

class Categoria(models.Model):  
    descricao = models.CharField(max_length=100)
    def __str__(self):
        return self.descricao

class Acessório(models.Model):
    descricao = models.CharField(max_length=100)
    def __str__(self):
        return self.descricao 

class Cor(models.Model):
    descricao = models.CharField(max_length=100)    
    def __str__(self):
        return self.descricao 

class Veículo(models.Model):
    marca = models.ForeignKey(Marca, on_delete=models.PROTECT, related_name='Veículo')
    categoria = models.ForeignKey(Categoria, on_delete=models.PROTECT, related_name='Veículo')
    cor = models.ForeignKey(Cor, on_delete=models.PROTECT, related_name='Veículo')
    ano = models.IntegerField(default=0, null=True)
    preco = models.DecimalField(max_digits=10, decimal_places=2, null=True, default=0)
    def __str__(self):
        return f"{self.marca} {self.categoria} {self.ano} {self.cor}"
    
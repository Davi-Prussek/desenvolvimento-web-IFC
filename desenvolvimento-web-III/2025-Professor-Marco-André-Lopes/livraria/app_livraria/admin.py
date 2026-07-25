from django.contrib import admin

from app_livraria.models.categoria import Categoria
from app_livraria.models.autor import Autor
from app_livraria.models.livro import Livro
from app_livraria.models.editora import Editora

admin.site.register(Autor)
admin.site.register(Categoria)
admin.site.register(Editora)
admin.site.register(Livro)
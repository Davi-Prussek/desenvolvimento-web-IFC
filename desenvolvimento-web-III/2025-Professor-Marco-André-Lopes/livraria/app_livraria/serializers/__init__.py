from .autor import autorSerializer
from .categoria import CategoriaSerializer
from .editora import EditoraSerializer
from .livro import LivroSerializer,LivroDetailSerializer,LivroListSerializer

all = [autorSerializer, CategoriaSerializer, EditoraSerializer, LivroSerializer,LivroDetailSerializer,LivroListSerializer]
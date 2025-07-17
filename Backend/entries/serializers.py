from rest_framework import serializers
from .models import Journals

class JournalsSerializer(serializers.Serializer):
    class Meta:
        model = Journals
        fields = ["id","title","content","created_at","updated_at"]

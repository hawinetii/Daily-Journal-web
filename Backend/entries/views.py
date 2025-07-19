from django.shortcuts import get_object_or_404
from rest_framework.request import Request
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Journals
from .serializers import JournalsSerializer
# Create your views here.

#listing all the entries I have and created a new entries
@api_view(["GET"])
def journals(request: Request):
    if request.method == "POST":
        serializer = JournalsSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            response = {
                "message": "Journals Has been created",
                "data": serializer.data
            }
            return Response(data = response, status= status.HTTP_201_CREATED)
        return Response(data= serializer.error, status= status.HTTP_400_BAD_REQUEST)
    
    journals = Journals.objects.all()
    serializer = JournalsSerializer(instance=journals, many= True)
    response = {"message": "journals", "data": serializer.data}
    return Response(data= response, status = status.HTTP_200_OK)

#getting an entrie by an id
@api_view(["GET"])
def journals_detail(request: Request, journal_id: int):
    journal = get_object_or_404(Journals, pk= journal_id)
    serializer = JournalsSerializer(journal)
    response = {"message": "journal", "data": serializer.data}
    return Response(data= response, status = status.HTTP_200_OK)

@api_view(["PUT"])
def update_journal(request: Request, journal_id: int):
    journal = get_object_or_404(Journals, pk = journal_id)
    serializer = JournalsSerializer(instance = journal, data = request.data)
    if serializer.is_valid():
        serializer.save()
        response = {
        "message": "Post has been updated!",
        "data": serializer.data
        }
        return Response(data= response, status = status.HTTP_200_OK)
    return Response(data= serializer.error, status= status.HTTP_400_BAD_REQUEST)

@api_view(["DELETE"])
def delete_journal(request:Request, journal_id:int):
    journal = get_object_or_404(Journals, pk= journal_id)
    journal.delete()
    response = {"message": "Journal has been deleted!"}
    return Response(data = response, status= status.HTTP_204_NO_CONTENT)


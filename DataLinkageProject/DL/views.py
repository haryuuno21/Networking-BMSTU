from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import json

@api_view(["Post"])
def post(self, request, format = None):
    try:
        queueCoding = make_data(request.body)

        queueMistake = makeMistake(queueCoding)

        queueDecrypted = makeDecryption(queueMistake)
    
    except:
        return(Response(status = status.HTTP_400_BAD_REQUEST))
    
    return Response(status = status.HTTP_200_OK)


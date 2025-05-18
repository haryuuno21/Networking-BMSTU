from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from DL.coding import make_data, make_mistake, make_decryption 
import requests

@api_view(["POST"])
def post(request, format = None):
    try:
        request_body_str = request.body.decode('utf-8')
        print(request_body_str)
        kot, queueCoding = make_data(request_body_str)
        queueMistake = make_mistake(queueCoding)

        queueDecrypted = make_decryption(queueMistake, kot)
    except Exception as e:
        print(e)
        return(Response(status = status.HTTP_400_BAD_REQUEST))
    
    response = requests.post('http://10.242.243.194:8080/transfer', data = queueDecrypted)

    return Response(status = status.HTTP_200_OK)


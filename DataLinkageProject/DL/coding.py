import numpy as np
import json
import math as math
from typing import Dict
import random

perevod: Dict[int, int] = {
    1: 0b1,
    2: 0b10,
    4: 0b100,
    8: 0b1000,
    3: 0b10000,
    6: 0b100000,
    12: 0b1000000,
    11: 0b10000000,
    5: 0b100000000,
    10: 0b1000000000,
    7: 0b10000000000,
    14: 0b100000000000,
    15: 0b1000000000000,
    13: 0b10000000000000,
    9: 0b100000000000000
}

def bin_to_dec(string):
    return int(string, 2)
    
def division(delymoe):
    delytel = bin_to_dec("10011")
    difference = 1
    while(difference >= 0):
        difference = bin(delymoe).__len__() - bin(delytel).__len__()
        if difference>0:
            delymoe = delymoe ^ (delytel<<difference)
        else:
            delymoe = delymoe ^ delytel
        difference = bin(delymoe).__len__() - bin(delytel).__len__()
    return delymoe

def make_data(message):

    message = json.dumps(message, separators=(',', ':'), indent=None)
    binary_str = ''.join(format(ord(char), '08b') for char in message)

    chunk_size = 11
    chunks = [binary_str[i:i+chunk_size] for i in range(0, len(binary_str), chunk_size)]
    kot = ''
    if len(chunks[-1]) < chunk_size:
        kot = len(chunks[-1])
        chunks[-1] = chunks[-1].ljust(chunk_size, '0')
    coded_blocks = [code(chunk) for chunk in chunks]
    return(kot, coded_blocks)

def code(massage):
    a = massage
    b = bin_to_dec(a)
    b = b << 4
    ostatok = division(b)
    b = b | ostatok
    return bin(b)[2:]

def make_mistake(coded_blocks):
    chance = 0.09  # Вероятность ошибки (100%)
    if random.random() <= chance:
        block = random.randint(0, len(coded_blocks)-1)
        bit = random.randint(0, len(coded_blocks[block])-1)
        
        # Преобразуем строку в список (чтобы можно было менять символы)
        block_list = list(coded_blocks[block])
        
        # Инвертируем выбранный бит
        if block_list[bit] == '1':
            block_list[bit] = '0'
        else:
            block_list[bit] = '1'
        
        # Собираем обратно в строку
        coded_blocks[block] = ''.join(block_list)
    
    return coded_blocks

def make_decryption(coded_blocks, kot):
    if random.random() < 0.01:
        print('random error')
        raise Exception('random error')
    decoded_blocks = []
    
    for block in coded_blocks:
        # Проверяем длину блока (должна быть 15 бит)
        if len(block) < 15:
            block = block.zfill(15)
        
        # Исправление ошибки
        syndrome = division(bin_to_dec(block))
        if syndrome != 0:
            errorbytable = perevod.get(syndrome, 0)
            block_dec = bin_to_dec(block)
            block_dec = block_dec ^ errorbytable
            block = bin(block_dec)[2:].zfill(15)
        
        # Удаление контрольных битов (оставляем первые 11 бит)
        info_bits = block[:11]
        decoded_blocks.append(info_bits)
    
    # Объединяем все биты в одну строку
    full_binary_str = ''.join(decoded_blocks)
    
    # Удаляем добавленные нули (если они были)
    if kot and isinstance(kot, int):
        full_binary_str = full_binary_str[:-(11 - kot)]
    
    # Разбиваем на байты (по 8 бит) и преобразуем в строку
    message_bytes = [full_binary_str[i:i+8] for i in range(0, len(full_binary_str), 8)]
    
    # Удаляем последний байт, если он неполный (может появиться из-за удаления доп. нулей)
    if len(message_bytes[-1]) < 8:
        message_bytes = message_bytes[:-1]
    
    message = ''.join([chr(int(byte, 2)) for byte in message_bytes if byte])
    
    # Преобразуем JSON обратно в объект Python
    try:
        return json.loads(message)
    except json.JSONDecodeError as e:
        print(f"Ошибка декодирования JSON: {e}")
        print(f"Полученная строка: {message}")
        return None

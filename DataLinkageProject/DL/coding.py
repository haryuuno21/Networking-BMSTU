import numpy as np
import json

syndrome_to_error = {
    (0, 0, 1): (0, 0, 0, 0, 0, 0, 1),
    (0, 1, 0): (0, 0, 0, 0, 0, 1, 0),
    (1, 0, 0): (0, 0, 0, 0, 1, 0, 0),
    (0, 1, 1): (0, 0, 0, 1, 0, 0, 0),
    (1, 1, 0): (0, 0, 1, 0, 0, 0, 0),
    (1, 1, 1): (0, 1, 0, 0, 0, 0, 0),
    (1, 0, 1): (1, 0, 0, 0, 0, 0, 0),
}

N = 7
K = 4
gx = np.array([1, 0, 1, 1])  # Образующий полином x**3 + x + 1
mx = np.array([0, 0, 0, 1])  # Полином информационного вектора


def gf2_division(dividend, divisor):
    temp_div = np.copy(dividend)
    deg_diff = len(temp_div) - len(divisor)

    while deg_diff >= 0:
        temp_div[: len(divisor)] ^= divisor
        temp_div = np.trim_zeros(temp_div, trim="f")
        deg_diff = len(temp_div) - len(divisor)

    return temp_div


def code(message):
    mx = np.concatenate((mx, np.array([0 for _ in range(N - K)])))

    px = gf2_division(mx, gx)
    px = np.pad(px, (N - len(px), 0))

    vx = mx ^ px
    pass



def make_data(data, SEGMENT_SIZE=100):
    """
    Преобразует данные в битовый поток, разбивает на 11-битные блоки,
    кодирует их в [15, 11] циклический код и возвращает 7-битные сегменты.
    
    Параметры:
        data: входные данные (любой JSON-сериализуемый объект)
        use_cyclic_code: если True — применяет циклический код [15, 11], иначе — код Хэмминга
        SEGMENT_SIZE: размер сегмента в байтах перед кодированием (по умолчанию 100)
    
    Возвращает:
        Список 7-битных строк (последняя может быть короче)
    """
    # 1. Преобразуем данные в битовую строку
    json_str = json.dumps(data)
    byte_data = bytearray(json_str, 'utf-8')
    bit_stream = ''.join(bin(byte)[2:].zfill(8) for byte in byte_data)

    # 2. Разбиваем на сегменты по `SEGMENT_SIZE` байт (как в исходной функции)
    segments = [
        bit_stream[i * SEGMENT_SIZE * 8 : (i + 1) * SEGMENT_SIZE * 8]
        for i in range((len(bit_stream) + SEGMENT_SIZE * 8 - 1) // (SEGMENT_SIZE * 8))
    ]

    # 3. Разбиваем каждый сегмент на 11-битные блоки (дополняем последний нулями)
    encoded_bits = []
    for segment in segments:
        # Дополняем сегмент нулями, чтобы длина делилась на 11
        padded_segment = segment.ljust(((len(segment) + 10) // 11) * 11, '0')
        
        # Разбиваем на 11-битные блоки
        blocks_11bit = [padded_segment[i:i+11] for i in range(0, len(padded_segment), 11)]
        
        # Кодируем каждый блок в 15 бит
        for block in blocks_11bit:
            encoded_block = cyclic_code_15_11_encode(block)  # Реализация ниже            
            encoded_bits.append(encoded_block)

    # 4. Объединяем все биты и разбиваем на 7-битные части
    final_bit_stream = ''.join(encoded_bits)
    return [final_bit_stream[i:i+7] for i in range(0, len(final_bit_stream), 7)]


def cyclic_code_15_11_encode(data_11bit):
    """
    Кодирует 11-битные данные в 15-битный циклический код.
    Предполагается, что используется CRC-код с порождающим многочленом x⁴ + x + 1 (стандартный для [15,11]).
    """
    if len(data_11bit) != 11:
        raise ValueError("Данные должны быть ровно 11 бит!")
    
    # Преобразуем строку битов в полином (например, "1101" → x³ + x² + 1)
    data_poly = int(data_11bit, 2)
    
    # Умножаем на x⁴ (сдвигаем на 4 бита влево)
    shifted_poly = data_poly << 4
    
    # Делим на порождающий полином x⁴ + x + 1 (10011 в бинарном виде)
    generator = 0b10011  # x⁴ + x + 1
    remainder = shifted_poly
    for _ in range(11):
        if remainder & (1 << 14):  # Если старший бит (x¹⁴) установлен
            remainder ^= (generator << 10)  # Вычитаем генератор (умноженный на x¹⁰)
        remainder <<= 1
    
    remainder >>= 11  # Убираем лишние сдвиги
    
    # Закодированный блок: (data_11bit << 4) | remainder
    encoded_block = (data_poly << 4) | (remainder >> 1)
    
    # Возвращаем 15-битную строку
    return bin(encoded_block)[2:].zfill(15)


# Пример использования:
data = {"key": "value", "num": 12345}
encoded_segments = make_data(data, use_cyclic_code=True)
print(encoded_segments)
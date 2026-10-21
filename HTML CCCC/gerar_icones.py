"""
Gera os ícones PNG do Laboratório C (sem bibliotecas externas).
Uso (só se quiser refazer os ícones):  python gerar_icones.py
"""
import math
import struct
import zlib

FUNDO = (11, 18, 32)       # azul-escuro
COR_C = (56, 189, 248)     # ciano


def cobertura(x, y, tamanho, escala_letra):
    """Retorna de 0 a 1 quanto o pixel (x, y) pertence à letra C."""
    cx = cy = tamanho / 2
    raio_externo = tamanho * 0.30 * escala_letra
    raio_interno = tamanho * 0.18 * escala_letra
    dx, dy = x - cx, y - cy
    dist = math.hypot(dx, dy)
    angulo = math.degrees(math.atan2(dy, dx))  # 0 = direita

    # abertura do C: ângulos entre -40 e +40 graus (lado direito)
    if abs(angulo) < 40:
        return 0.0
    suave = 1.0  # bordas suaves de ~1 pixel
    entra = min(1.0, max(0.0, dist - raio_interno + 0.5))
    sai = min(1.0, max(0.0, raio_externo - dist + 0.5))
    return min(entra, sai) * suave


def criar_png(caminho, tamanho, cantos_redondos, escala_letra=1.0):
    linhas = bytearray()
    raio_canto = tamanho * 0.19
    for y in range(tamanho):
        linhas.append(0)  # filtro "nenhum"
        for x in range(tamanho):
            alfa = 255
            if cantos_redondos:
                # recorta cantos arredondados (alfa 0 fora do quadrado)
                px = min(x, tamanho - 1 - x)
                py = min(y, tamanho - 1 - y)
                if px < raio_canto and py < raio_canto:
                    d = math.hypot(raio_canto - px, raio_canto - py)
                    alfa = 255 if d <= raio_canto else 0
            c = cobertura(x + 0.5, y + 0.5, tamanho, escala_letra)
            r = round(FUNDO[0] + (COR_C[0] - FUNDO[0]) * c)
            g = round(FUNDO[1] + (COR_C[1] - FUNDO[1]) * c)
            b = round(FUNDO[2] + (COR_C[2] - FUNDO[2]) * c)
            linhas += bytes((r, g, b, alfa))

    def bloco(tipo, dados):
        corpo = tipo + dados
        return struct.pack(">I", len(dados)) + corpo + struct.pack(">I", zlib.crc32(corpo) & 0xFFFFFFFF)

    cabecalho = struct.pack(">IIBBBBB", tamanho, tamanho, 8, 6, 0, 0, 0)
    png = b"\x89PNG\r\n\x1a\n" + bloco(b"IHDR", cabecalho) + \
          bloco(b"IDAT", zlib.compress(bytes(linhas), 9)) + bloco(b"IEND", b"")
    with open(caminho, "wb") as arquivo:
        arquivo.write(png)
    print("Criado:", caminho)


if __name__ == "__main__":
    criar_png("icon-192.png", 192, True)
    criar_png("icon-512.png", 512, True)
    # versão "maskable": fundo cheio (sem cantos) e letra menor, dentro da área segura
    criar_png("icon-maskable-512.png", 512, False, 0.9)

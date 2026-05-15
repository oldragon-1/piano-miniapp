"""暴力压缩 share_card_bg.png 到 50KB 以下"""
from PIL import Image
import os

img_path = r'D:\piano-miniapp\images\share_card_bg.png'
img = Image.open(img_path)
print(f"原始: {img.size}, {os.path.getsize(img_path)/1024:.1f}KB")

# 缩到宽度500px
w, h = img.size
ratio = min(500 / w, 1.0)
new_w, new_h = int(w * ratio), int(h * ratio)
img = img.resize((new_w, new_h), Image.LANCZOS)
print(f"缩放: {new_w}x{new_h}")

# 转JPEG（有损，但小很多）
# 先创建白色背景处理透明度
if img.mode == 'RGBA':
    bg = Image.new('RGBA', img.size, (255, 255, 255))
    bg.paste(img, (0, 0), img)
    img = bg.convert('RGB')
elif img.mode != 'RGB':
    img = img.convert('RGB')

jpg_path = img_path.replace('.png', '.jpg')
quality = 55
for attempt in range(3):
    img.save(jpg_path, 'JPEG', quality=quality, optimize=True)
    size_kb = os.path.getsize(jpg_path) / 1024
    print(f"JPEG quality={quality}: {size_kb:.1f}KB")
    if size_kb < 50:
        break
    quality -= 10

# 替换原PNG文件
os.replace(jpg_path, img_path)
final = os.path.getsize(img_path) / 1024
print(f"最终: {final:.1f}KB")

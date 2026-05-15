"""压缩 share_card_bg.png 到 200KB 以下
使用方法：在命令行运行 python compress_share_card.py
"""
from PIL import Image
import os

img_path = r'D:\piano-miniapp\images\share_card_bg.png'
img = Image.open(img_path)
orig_size = os.path.getsize(img_path) / 1024
print(f"原始大小: {img.size}, {orig_size:.1f}KB")

# 等比例缩到宽度750
w, h = img.size
ratio = min(750 / w, 1.0)
new_w, new_h = int(w * ratio), int(h * ratio)
img_resized = img.resize((new_w, new_h), Image.LANCZOS)
print(f"缩放到: {new_w}x{new_h}")

# 保存为优化PNG
img_resized.save(img_path, 'PNG', optimize=True)
final_size = os.path.getsize(img_path) / 1024
print(f"优化后: {final_size:.1f}KB")

# 如果还超过200KB，降色深到256色
if final_size > 200:
    print("超过200KB，降色深到256色...")
    img_quant = img_resized.quantize(colors=256, method=Image.Quantize.MEDIANCUT)
    img_quant.save(img_path, 'PNG', optimize=True)
    final_size = os.path.getsize(img_path) / 1024
    print(f"降色后: {final_size:.1f}KB")

# 还超就转JPEG
if final_size > 200:
    print("仍超过200KB，转JPEG格式...")
    # PNG转JPEG需要有白色背景（因为PNG有透明度）
    bg = Image.new('RGB', img_resized.size, (255, 255, 255))
    if img_resized.mode == 'RGBA':
        bg.paste(img_resized, img_resized)
    else:
        bg.paste(img_resized)
    jpg_path = img_path.replace('.png', '.jpg')
    bg.save(jpg_path, 'JPEG', quality=60, optimize=True)
    jpg_size = os.path.getsize(jpg_path) / 1024
    print(f"JPEG格式: {jpg_size:.1f}KB")
    if jpg_size < 200:
        # 替换原文件引用也要改，所以先保留png但变小
        print("JPEG满足要求。但需替换PNG文件")
        os.replace(jpg_path, img_path)

final_size = os.path.getsize(img_path) / 1024
print(f"最终大小: {final_size:.1f}KB")
if final_size < 200:
    print("✅ 已满足200KB要求！")
else:
    print(f"⚠️ 仍需手动处理，当前{final_size:.1f}KB")

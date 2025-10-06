from django.core.management.base import BaseCommand
from apps.sales.models import Product
from apps.rentals.models import RentalProduct


class Command(BaseCommand):
    help = "Seed the database with initial products (Sales + Rentals)"

    def handle(self, *args, **kwargs):
        # --- Seed Sales Products ---
        sales_products = [
            {
                "name": "Epson Home Cinema 2150",
                "slug": "epson-home-cinema-2150",
                "brand": "Epson",
                "model": "2150",
                "price": 150000.00,
                "lumens": 2500,
                "resolution": "1080p",
                "is_available": True,
                "stock": 10,
                "image": "images/epson-2150.jpg",
                "description": "The Epson Home Cinema 2150 offers widescreen Full HD entertainment with wireless streaming and mirroring capabilities.",
            },
            {
                "name": "BenQ TK800M",
                "slug": "benq-tk800m",
                "brand": "BenQ",
                "model": "TK800M",
                "price": 250000.00,
                "lumens": 3000,
                "resolution": "4K UHD",
                "is_available": True,
                "stock": 5,
                "image": "images/benq-tk800m.jpg",
                "description": "The BenQ TK800M delivers true 4K UHD resolution and stunning HDR for sports, movies, and gaming in bright environments.",
            },
            {
                "name": "Optoma HD146X",
                "slug": "optoma-hd146x",
                "brand": "Optoma",
                "model": "HD146X",
                "price": 180000.00,
                "lumens": 3600,
                "resolution": "1080p",
                "is_available": True,
                "stock": 7,
                "image": "images/optoma-hd146x.jpg",
                "description": "The Optoma HD146X is a home theater projector with 3600 lumens, excellent color accuracy, and gaming-friendly low input lag.",
            },
        ]

        for p in sales_products:
            product, created = Product.objects.get_or_create(
                slug=p["slug"],
                defaults=p,
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f"✅ Created Product: {p['name']}"))
            else:
                self.stdout.write(self.style.WARNING(f"⚠️ Product already exists: {p['name']}"))

        # --- Seed Rental Products ---
        rental_products = [
            {
                "name": "Epson Rental 1080p",
                "slug": "epson-rental-1080p",
                "brand": "Epson",
                "model": "R-1080p",
                "price_per_day": 15000.00,
                "lumens": 2500,
                "resolution": "1080p",
                "hdmi": True,
                "vga": False,
                "total_quantity": 5,
                "image": "images/epson-rental-1080p.jpg",
                "description": "Rent Epson projector with Full HD 1080p quality, ideal for small events and presentations.",
            },
            {
                "name": "BenQ Rental 4K",
                "slug": "benq-rental-4k",
                "brand": "BenQ",
                "model": "R-4K",
                "price_per_day": 20000.00,
                "lumens": 3000,
                "resolution": "4K UHD",
                "hdmi": True,
                "vga": True,
                "total_quantity": 3,
                "image": "images/benq-rental-4k.jpg",
                "description": "Rent BenQ 4K UHD projector, great for high-definition movie nights and events.",
            },
            {
                "name": "Optoma Rental HD",
                "slug": "optoma-rental-hd",
                "brand": "Optoma",
                "model": "R-HD",
                "price_per_day": 12000.00,
                "lumens": 3600,
                "resolution": "1080p",
                "hdmi": True,
                "vga": False,
                "total_quantity": 6,
                "image": "images/optoma-rental-hd.jpg",
                "description": "Rent Optoma HD projector with sharp visuals and strong brightness for meetings and home use.",
            },
        ]

        for r in rental_products:
            rental, created = RentalProduct.objects.get_or_create(
                slug=r["slug"],
                defaults=r,
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f"✅ Created RentalProduct: {r['name']}"))
            else:
                self.stdout.write(self.style.WARNING(f"⚠️ RentalProduct already exists: {r['name']}"))
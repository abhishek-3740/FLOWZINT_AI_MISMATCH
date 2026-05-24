import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import gsap from 'gsap';
import HaggleModal from '../components/commerce/HaggleModal';
import ProductCard from '../components/ui/ProductCard';
import { useCart } from '../contexts/CartContext';
import { getProductById, products } from '../data/mockData';

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart, getItemQuantity, updateQuantity } = useCart();
  const product = getProductById(productId);
  const [activeImage, setActiveImage] = useState(product.gallery[0]);
  const [haggleOpen, setHaggleOpen] = useState(false);
  const pageRef = useRef(null);
  const galleryRefs = useRef([]);
  const itemQuantity = getItemQuantity(product.id);

  useEffect(() => {
    setActiveImage(product.gallery[0]);
  }, [product.id]);

  useLayoutEffect(() => {
    if (!pageRef.current) {
      return undefined;
    }

    gsap.fromTo(
      pageRef.current.querySelectorAll('.page-reveal'),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, stagger: 0.08, ease: 'power2.out' },
    );
  }, [product.id]);

  useLayoutEffect(() => {
    if (!galleryRefs.current.length) {
      return undefined;
    }

    gsap.fromTo(galleryRefs.current, { scale: 0.96, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.04, duration: 0.4 });
    return undefined;
  }, [product.id]);

  if (!product) {
    navigate('/', { replace: true });
    return null;
  }

  return (
    <main ref={pageRef} className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="page-reveal mb-8 flex items-center justify-between gap-4">
        <Link to="/" className="text-sm text-slate-400 transition hover:text-white">
          Back to home
        </Link>
        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-sage-200">
          Premium product detail
        </span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <section className="page-reveal rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-soft">
          <div className="overflow-hidden rounded-[1.5rem] bg-slate-900">
            <img src={activeImage} alt={product.name} className="h-[420px] w-full object-cover sm:h-[520px]" />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {product.gallery.map((image, index) => (
              <button
                key={image}
                ref={(element) => {
                  galleryRefs.current[index] = element;
                }}
                type="button"
                onClick={() => setActiveImage(image)}
                className={`overflow-hidden rounded-2xl border transition ${
                  activeImage === image ? 'border-sage-200/50 ring-1 ring-sage-200/30' : 'border-white/10 hover:border-white/25'
                }`}
              >
                <img src={image} alt={`${product.name} angle ${index + 1}`} className="h-24 w-full object-cover" />
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="page-reveal rounded-[2rem] border border-white/10 bg-slate-950/75 p-6 shadow-soft">
            <p className="text-xs uppercase tracking-[0.34em] text-sage-200">{product.category}</p>
            <h1 className="mt-3 text-4xl text-white sm:text-5xl">{product.name}</h1>
            <p className="mt-4 text-base leading-8 text-slate-300">{product.description}</p>

            <div className="mt-6 flex items-center gap-3 text-sm text-slate-300">
              <span className="rounded-full bg-sage-200/10 px-3 py-1 text-sage-100">{product.rating} rating</span>
              <span>{product.reviewsCount} reviews</span>
            </div>

            <div className="mt-8 flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-5">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Price</p>
                <p className="mt-2 text-4xl text-white">{formatPrice(product.price)}</p>
              </div>
              <button
                type="button"
                onClick={() => setHaggleOpen(true)}
                className="rounded-full border border-sage-200/30 bg-sage-200/10 px-5 py-3 text-sm font-semibold text-sage-100 transition hover:bg-sage-200 hover:text-slate-950"
              >
                Negotiate Price
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {itemQuantity > 0 ? (
                <div className="inline-flex items-center rounded-full border border-white/10 bg-slate-950/70">
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, itemQuantity - 1)}
                    className="px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
                    aria-label={`Decrease quantity of ${product.name}`}
                  >
                    -
                  </button>
                  <span className="min-w-10 px-4 py-3 text-center text-sm font-semibold text-white">{itemQuantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, itemQuantity + 1)}
                    className="px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
                    aria-label={`Increase quantity of ${product.name}`}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    addToCart(product);
                    navigate('/cart');
                  }}
                  className="rounded-full bg-sage-200 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white"
                >
                  Add to cart
                </button>
              )}
              <button
                type="button"
                onClick={() => navigate('/concierge')}
                className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
              >
                Ask AI concierge
              </button>
            </div>
          </div>

          <div className="page-reveal rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-soft">
            <h2 className="text-2xl text-white">Why it stands out</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {product.benefits.map((benefit) => (
                <span key={benefit} className="rounded-full border border-white/10 bg-slate-950/60 px-4 py-2 text-sm text-slate-200">
                  {benefit}
                </span>
              ))}
            </div>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-400">
              {product.notes.map((note) => (
                <li key={note}>- {note}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <section className="page-reveal mt-10 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/75 p-6 shadow-soft">
          <h2 className="text-2xl text-white">Reviews</h2>
          <div className="mt-5 space-y-4">
            {product.reviews.map((review) => (
              <article key={`${review.name}-${review.comment}`} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-white">{review.name}</p>
                  <p className="text-sm text-sage-200">{review.rating} / 5</p>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-300">{review.comment}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-soft">
          <h2 className="text-2xl text-white">Recommended with this item</h2>
          <div className="mt-5 grid gap-4">
            {products
              .filter((item) => item.id !== product.id)
              .slice(0, 3)
              .map((item) => (
                <ProductCard key={item.id} product={item} compact />
              ))}
          </div>
        </div>
      </section>

      <HaggleModal open={haggleOpen} product={product} onClose={() => setHaggleOpen(false)} />
    </main>
  );
}
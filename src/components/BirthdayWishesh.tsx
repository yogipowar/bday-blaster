import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Send } from 'lucide-react';
import Confetti from '../utils/Confetti';
import Balloons from '../utils/Balloons';
import emailjs from '@emailjs/browser';


const BirthdayWishes: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showAnimations, setShowAnimations] = useState(true);

  const images = [
    {
      url: "/sn-1.jpg",
      caption: "Perfect Trip🥰"
    },
    {
      url: "/sn-3.jpg",
      caption: "Missing Those days🥹"
    },
    {
      url: "/sn-2.jpg",
      caption: "Maintaining Distance🫣😅"
    }
  ];

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       const quoteElement = document.getElementById('friendship-quote');
//       if (quoteElement) {
//         quoteElement.scrollIntoView({ behavior: 'smooth' });
//       }
//     }, 5000);

//     return () => clearTimeout(timer);
//   }, []);

const form = useRef<HTMLFormElement | null>(null);

const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    emailjs
      .sendForm('service_djo9bbd', 'template_oolgwyo', form.current!, {
        publicKey: '6543lc9nixwd0wXLZ',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          setSubmitted(true); // ✅ Show success message
          setMessage(''); // (Optional) Clear textarea
        },
        (error) => {
          console.log('FAILED...', error.text);
        }
      );
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 text-center overflow-hidden relative">
      {showAnimations && (
        <>
          <Confetti />
          <Balloons />
        </>
      )}

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="birthday-header mb-12 relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text md:leading-normal leading-tight bg-gradient-to-r from-pink-600 to-purple-700 mb-4 animate-bounce-slow">
            Happy Birthday Shraddha!
          </h1>
          <p className="text-xl text-purple-800 animate-fadeIn">
            On this special day, celebrating the amazing person you are!
          </p>
        </div>

         {/* Photo Gallery */}
         <div className="gallery-section mb-16">
          <h2 className="text-3xl font-bold text-purple-700 mb-8">Precious Moments</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <div key={index} className="relative group overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105">
                <img 
                  src={image.url} 
                  alt={image.caption}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-white text-sm">{image.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Birthday Wishes Content */}
        <div className="wishes-content">
          <div className="message-card bg-white rounded-xl shadow-xl p-8 mb-12 transform transition duration-700 hover:scale-105">
            <div className="message-content text-left">
              <h2 className="text-2xl font-bold text-pink-600 mb-4 flex items-center">
                <Heart className="mr-2 text-pink-500" fill="#ec4899" /> Birthday Wishes
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
              Happy Birthday, bestie! You’re the kind of friend everyone wishes for — kind, fun, and full of good vibes. Hope your day is filled with everything that makes you smile!
              </p>
            </div>
          </div>

          {/* Friendship Quote */}
          <div id="friendship-quote" className="quote-section my-16 relative">
            <div className="quote-card bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-2xl p-8 text-white relative animate-fadeInUp">
              <div className="absolute -top-5 -left-5 text-7xl text-purple-300 opacity-70">"</div>
              <div className="quote-content relative z-10">
                <p className="text-lg md:text-xl mb-6 leading-relaxed">
                It’s crazy how life brings people together at the perfect time. Just two months ago, we didn’t even know each other, and Now here we are — sharing secrets, opening up about our families, exchanging flirty jokes, diving into cheeky conversations, and even having our intense daily fights — all of it feels like we’ve known each other forever. You’ve become more than just a friend to me; you’ve become someone I genuinely rely on.Thank you for choosing me as your best friend and letting me share this beautiful bond with you.
                </p>
                <p className="text-lg md:text-xl font-bold mb-2">
                  Come back soon from Mahabaleshwar! I can't wait to meet you again and go for 
                  our walks backside of Rankala.
                </p>
                <div className="text-right text-sm opacity-80">- Your best friend <i> Yogyaa </i></div>
              </div>
              <div className="absolute -bottom-5 -right-5 text-7xl text-purple-300 opacity-70 rotate-180">"</div>
            </div>
          </div>

          {/* Comment Section Toggle */}
          <div className="comment-toggle mt-12 mb-6">
            <button 
              onClick={() => setShowForm(!showForm)}
              className="flex items-center mx-auto text-purple-700 px-6 py-3 rounded-full font-medium bg-purple-200 transition-all"
            >
              <MessageCircle className="mr-2" size={18} />
              {showForm ? 'Hide Message Form' : 'Click to Share Your Thoughts, Shraddha!'}
            </button>
          </div>

          {/* Comment Form */}
          {showForm && (
            <div className="comment-form-container bg-white rounded-xl shadow-lg p-6 mb-12 animate-fadeIn max-w-xl mx-auto">
              {submitted ? (
                <div className="success-message text-center py-8">
                  <h3 className="text-xl font-bold text-green-600 mb-2">Thank You, Shraddha!</h3>
                  <p className="text-gray-700">Your message has been successfully sent on Yogesh's personal email!</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-purple-600 hover:text-purple-800"
                  >
                    Share another thought
                  </button>
                </div>
              ) : (
                <form onSubmit={sendEmail} ref={form}>
                  <h3 className="text-xl font-bold text-purple-700 mb-4">Share Your Birthday Thoughts</h3>
                  <p className="text-gray-600 mb-4">This space is just for you, Shraddha!</p>
                  <textarea
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your thoughts here, Shraddha..."
                    className="w-full p-4 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none h-32"
                    required
                    // disabled={sending}
                  />
                  <button 
                    type="submit" 
                    className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-6 rounded-lg flex items-center justify-center mx-auto hover:opacity-90 transition-opacity disabled:opacity-50"
                    // disabled={sending}
                  >
                    <Send className="mr-2"size={16} />
                    {/* {sending ? 'Sending...' : 'Save & Send My Thoughts'} */}
                    Send My Thoughts
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Back to Start Link */}
          <div className="mt-16 mb-8">
            <Link to="/" className="text-purple-700 hover:text-purple-900 font-medium">
              ← Back to start
            </Link>
          </div>

          <div className="text-sm text-gray-500 mt-4">
            <button 
              onClick={() => setShowAnimations(!showAnimations)} 
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              {showAnimations ? 'Pause animations' : 'Resume animations'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirthdayWishes;

import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  const socialLinks = [
    {
      name: 'Instagram',
      icon: 'fa-brands fa-instagram',
      url: 'https://www.instagram.com/eaglegym2024',
      color: '#E4405F'
    },
    {
      name: 'WhatsApp',
      icon: 'fa-brands fa-whatsapp',
      url: 'https://wa.me/201507817517',
      color: '#25D366'
    },
    {
      name: 'Facebook',
      icon: 'fa-brands fa-facebook',
      url: 'https://www.facebook.com/profile.php?id=61554637528211',
      color: '#1877F2'
    },
    {
      name: 'Location',
      icon: 'fa-solid fa-location-dot',
      url: 'https://www.google.com/maps/place/eagle+gym+%D8%A7%D9%84%D9%81%D8%B3%D8%B7%D8%A7%D8%B7%E2%80%AD/data=!4m2!3m1!1s0x145847004519ae1f:0xd7eaec49d4769777?sa=X&ved=1t:242&ictx=111',
      color: '#EA4335'
    }
  ];

  const iconVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.2,
      rotate: 10,
      transition: { duration: 0.3 }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <>
      <motion.footer 
        className="bg-gradient-to-r from-black via-red-950 to-black border-t-4 border-red-600 mt-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            
            {/* Social Links */}
            <motion.div 
              className="flex gap-4"
              variants={itemVariants}
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:border-red-600 transition-all"
                  variants={iconVariants}
                  initial="rest"
                  whileHover="hover"
                  style={{
                    boxShadow: `0 0 20px ${link.color}40`
                  }}
                >
                  <i className={`${link.icon} text-2xl text-white`}></i>
                </motion.a>
              ))}
            </motion.div>

            {/* Logo */}
            <motion.div variants={itemVariants}>
              <img 
                src="/assets/bigLogo.png" 
                alt="Eagle Gym" 
                className="h-20 w-auto filter drop-shadow-2xl"
              />
            </motion.div>

            {/* Payment Methods */}
            <motion.div 
              className="flex flex-col items-center gap-3"
              variants={itemVariants}
            >
              <p className="text-white font-bold gymfont text-sm">WE ACCEPT</p>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20">
                <img 
                  src="/pay.png" 
                  alt="Payment Methods" 
                  className="h-10 w-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.footer>

      {/* Credits Section */}
      <motion.div 
        className="bg-black text-center py-4 border-t border-red-600/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-white/70 text-sm">
          Powered by{" "}
          <motion.a 
            href="https://fitboost.website/" 
            className="text-red-600 font-bold hover:text-red-500 transition-colors"
            whileHover={{ 
              scale: 1.05,
              textShadow: "0 0 10px rgba(220, 38, 38, 0.8)"
            }}
          >
            FitBoost
          </motion.a>
          {" "}© {new Date().getFullYear()}
        </p>
      </motion.div>

      {/* Google Maps */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        whileInView={{ opacity: 1, height: 'auto' }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="overflow-hidden"
      >
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3455.060212663338!2d31.252080799999998!3d30.006427400000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145847004519ae1f%3A0xd7eaec49d4769777!2sEAGLE%20GYM!5e0!3m2!1sen!2seg!4v1762820295028!5m2!1sen!2seg"
          width="100%" 
          height="400" 
          style={{ border: 0, filter: 'grayscale(0.3) contrast(1.2)' }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="border-t-2 border-red-600"
        />
      </motion.div>
    </>
  );
}
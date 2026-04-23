import React from 'react';
import { motion } from 'framer-motion';
import { useBranch } from './context/BranchContext';

export default function Footer() {
  const { selectedBranch } = useBranch();

  // Location URLs for each branch
  const locationUrls = {
    boolaq: 'https://maps.app.goo.gl/aPxRWXb3iY4j8SMd8',
    qoopa: 'https://maps.app.goo.gl/vpAfmd612sXXUVwe9',
    fostat: 'https://www.google.com/maps/place/eagle+gym+%D8%A7%D9%84%D9%81%D8%B3%D8%B7%D8%A7%D8%B7%E2%80%AD/data=!4m2!3m1!1s0x145847004519ae1f:0xd7eaec49d4769777?sa=X&ved=1t:242&ictx=111',
    saft: 'https://maps.app.goo.gl/akT7uFigtVfcsBdF8',
    ba4tel: 'https://google.com/maps?q=30.085573,31.190752'
  };

  // WhatsApp numbers for each branch
  const whatsappNumbers = {
    boolaq: '01148149679',
    qoopa: '01100552674',
    fostat: '01507817517',
    saft: '01514137830',
    ba4tel: '01118887321'
  };

  const socialLinks = [
    {
      name: 'Instagram',
      icon: 'fa-brands fa-instagram',
      url: 'https://www.instagram.com/eaglegym2024',
      color: '#E4405F'
    },
    {
      name: 'Facebook',
      icon: 'fa-brands fa-facebook',
      url: 'https://www.facebook.com/profile.php?id=61554637528211',
      color: '#1877F2'
    },
    {
      name: 'WhatsApp',
      icon: 'fa-brands fa-whatsapp',
      url: `https://wa.me/2${whatsappNumbers[selectedBranch] || whatsappNumbers.fostat}`,
      color: '#25D366'
    },
    {
      name: 'Location',
      icon: 'fa-solid fa-location-dot',
      url: locationUrls[selectedBranch] || locationUrls.fostat,
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
          {/* App Download Section */}
          <motion.div
            className="flex flex-col items-center gap-4 mb-8 pb-8 border-b border-red-600/30"
            variants={itemVariants}
          >
            <h3 className="text-white gymfont text-xl md:text-2xl font-bold tracking-wider text-center">
              GET OUR GYM APP
            </h3>
            <p className="text-white/70 text-sm md:text-base text-center">
              Available on Android and iPhone
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.a
                href="https://play.google.com/store/apps/details?id=com.fitboost.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 hover:border-green-500 rounded-xl px-5 py-3 transition-all"
                whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(34, 197, 94, 0.5)' }}
                whileTap={{ scale: 0.98 }}
              >
                <i className="fa-brands fa-google-play text-3xl text-green-500"></i>
                <div className="flex flex-col items-start">
                  <span className="text-white/60 text-[10px] uppercase tracking-wide">Get it on</span>
                  <span className="text-white font-bold text-sm">Google Play</span>
                </div>
              </motion.a>

              <motion.a
                href="https://apps.apple.com/eg/app/fit-boost/id6760668273"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 hover:border-blue-400 rounded-xl px-5 py-3 transition-all"
                whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(96, 165, 250, 0.5)' }}
                whileTap={{ scale: 0.98 }}
              >
                <i className="fa-brands fa-apple text-3xl text-blue-400"></i>
                <div className="flex flex-col items-start">
                  <span className="text-white/60 text-[10px] uppercase tracking-wide">Download on the</span>
                  <span className="text-white font-bold text-sm">App Store</span>
                </div>
              </motion.a>
            </div>
          </motion.div>

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
    </>
  );
}
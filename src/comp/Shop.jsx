import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Shop() {
  const [activeTab, setActiveTab] = useState("meals");

  const meals = [
    { 
      id: 1, 
      name: "Chicken breasts + Rice + Vegetable",
      name_ar: "صدور دجاج + رز + خضار",
      protein: 50, 
      carbs: 57, 
      calories: 560, 
      price: 160,
      icon: "fa-drumstick-bite"
    },
    { 
      id: 2, 
      name: "Chicken breasts + Rice + Sweet corn",
      name_ar: "صدور دجاج + رز + ذرة حلوة",
      protein: 50, 
      carbs: 75, 
      calories: 580, 
      price: 160,
      icon: "fa-drumstick-bite"
    },
    { 
      id: 3, 
      name: "Steak + Rice + BBQ (Diet)",
      name_ar: "ستيك + رز + باربكيو دايت",
      protein: 44, 
      carbs: 57, 
      calories: 586, 
      price: 250,
      icon: "fa-steak"
    },
    { 
      id: 4, 
      name: "Tuna + Pasta + Vegetables",
      name_ar: "تونة + مكرونة + خضار",
      protein: 42, 
      carbs: 52, 
      calories: 420, 
      price: 140,
      icon: "fa-fish"
    },
  ];

  const shakes = [
    { id: 1, name: "WOLVERINE", price: 60, img: "/store/shakes/1.png", in: ['banana', 'peanut butter', 'milk', 'oats', 'honey'], color: 'from-yellow-600 to-amber-800' },
    { id: 2, name: "THING", price: 40, img: "/store/shakes/2.png", in: ['orange', 'Lemon', 'honey'], color: 'from-orange-600 to-yellow-600' },
    { id: 3, name: "HULK", price: 100, img: "/store/shakes/3.png", in: ['Avocado', 'Dates', 'Honey', 'milk', 'oats'], color: 'from-green-600 to-emerald-800' },
    { id: 4, name: "CAT WOMAN", price: 70, img: "/store/shakes/4.png", in: ['Dark chocolate', 'Honey', 'milk', 'oats'], color: 'from-gray-700 to-gray-900' },
    { id: 5, name: "SCARLET WITCH", price: 60, img: "/store/shakes/5.png", in: ['watermelon', 'Honey', 'milk', 'oats'], color: 'from-red-600 to-pink-700' },
    { id: 6, name: "X POWER", price: 75, img: "/store/shakes/6.png", in: ['Ginger', 'beet', 'milk', 'oats'], color: 'from-purple-600 to-indigo-800' },
  ];

  const orderNow = (itemName) => {
    const phone = "201028518754";
    const message = `Hello, I want to order: ${itemName}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const tabVariants = {
    inactive: { 
      scale: 1,
      backgroundColor: "rgba(220, 38, 38, 0.1)"
    },
    active: { 
      scale: 1.05,
      backgroundColor: "rgba(220, 38, 38, 1)",
      boxShadow: "0 0 30px rgba(220, 38, 38, 0.6)",
      transition: { duration: 0.3, ease: "easeOut" }
    },
    hover: {
      scale: 1.02,
      backgroundColor: "rgba(220, 38, 38, 0.8)",
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -12,
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(220, 38, 38, 0.5)",
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4 }
    },
    hover: {
      scale: 1.15,
      rotate: 5,
      transition: { duration: 0.3 }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const renderItems = () => {
    if (activeTab === "meals") {
      return meals.map((meal, index) => (
        <motion.div 
          key={meal.id} 
          className="relative group"
          variants={itemVariants}
          whileHover="hover"
          custom={index}
        >
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-black rounded-2xl blur-xl opacity-25 group-hover:opacity-50 transition duration-500"></div>
          
          {/* Card */}
          <div className="relative bg-black/90 backdrop-blur-xl rounded-2xl border-2 border-red-600/30 group-hover:border-red-600 transition-all overflow-hidden">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-800 p-4 relative overflow-hidden">
              <motion.div 
                className="absolute inset-0 bg-white/10"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <div className="relative flex items-center justify-between">
                <h3 className="font-bold text-xl gymfont text-white flex-1">{meal.name}</h3>
                <motion.i 
                  className={`fas ${meal.icon} text-3xl text-white`}
                  whileHover={{ scale: 1.3, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-white/80 text-sm mt-1">{meal.name_ar}</p>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              
              {/* Nutrition Info */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-red-600/10 rounded-lg p-3 border border-red-600/30">
                  <p className="text-red-600 font-bold text-2xl">{meal.protein}g</p>
                  <p className="text-white/70 text-xs uppercase">Protein</p>
                </div>
                <div className="bg-red-600/10 rounded-lg p-3 border border-red-600/30">
                  <p className="text-red-600 font-bold text-2xl">{meal.carbs}g</p>
                  <p className="text-white/70 text-xs uppercase">Carbs</p>
                </div>
                <div className="bg-red-600/10 rounded-lg p-3 border border-red-600/30">
                  <p className="text-red-600 font-bold text-2xl">{meal.calories}</p>
                  <p className="text-white/70 text-xs uppercase">Calories</p>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-white/70 text-sm">Price:</span>
                <span className="text-3xl font-bold text-red-600 gymfont">{meal.price} EGP</span>
              </div>

              {/* Button */}
              <motion.button
                onClick={() => orderNow(meal.name)}
                className="w-full px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold gymfont overflow-hidden relative group/btn"
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                <span className="relative z-10">ORDER NOW</span>
                <motion.div 
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>
            </div>
          </div>
        </motion.div>
      ));
    }

    if (activeTab === "shakes") {
      return shakes.map((shake, index) => (
        <motion.div 
          key={shake.id} 
          className="relative group"
          variants={itemVariants}
          whileHover="hover"
          custom={index}
        >
          {/* Glow Effect */}
          <div className={`absolute -inset-1 bg-gradient-to-r ${shake.color} rounded-2xl blur-xl opacity-25 group-hover:opacity-50 transition duration-500`}></div>
          
          {/* Card */}
          <div className="relative bg-black/90 backdrop-blur-xl rounded-2xl border-2 border-white/10 group-hover:border-red-600 transition-all overflow-hidden">
            
            {/* Header */}
            <div className={`bg-gradient-to-r ${shake.color} p-4 relative overflow-hidden`}>
              <motion.div 
                className="absolute inset-0 bg-white/10"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <h3 className="relative font-bold text-2xl gymfont text-white text-center tracking-wider">
                {shake.name}
              </h3>
            </div>

            {/* Image */}
            <div className="p-6">
              <motion.img 
                src={shake.img} 
                alt={shake.name} 
                className="w-full h-48 object-cover rounded-xl mb-4 border-2 border-white/10"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              />
              
              {/* Ingredients */}
              <div className="mb-4">
                <p className="text-white/70 text-sm mb-2 font-semibold">Ingredients:</p>
                <div className="flex flex-wrap gap-2">
                  {shake.in.map((ingredient, idx) => (
                    <motion.span 
                      key={idx}
                      className="px-3 py-1 bg-white/10 rounded-full text-white text-xs border border-white/20"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(220, 38, 38, 0.3)" }}
                    >
                      {ingredient}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-white/70 text-sm">Price:</span>
                <span className="text-3xl font-bold text-red-600 gymfont">{shake.price} EGP</span>
              </div>

              {/* Button */}
              <motion.button
                onClick={() => orderNow(shake.name)}
                className="w-full px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold gymfont overflow-hidden relative group/btn"
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                <span className="relative z-10">ORDER NOW</span>
                <motion.div 
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>
            </div>
          </div>
        </motion.div>
      ));
    }
  };

  return (
    <motion.div 
      className="min-h-screen py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 mt-40">
        
        {/* Title */}
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={titleVariants}
        >
          <h2 className='text-5xl md:text-6xl text-white font-bold gymfont mb-4 gradient-text'>
            OUR SHOP
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-red-600 to-white mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 text-lg">Fuel your body with quality nutrition</p>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          className="flex gap-4 mb-12 justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.button
            onClick={() => setActiveTab("meals")}
            className={`px-8 py-4 rounded-xl font-bold gymfont text-lg ${
              activeTab === "meals" ? "text-white" : "text-white/70"
            } border-2 ${
              activeTab === "meals" ? "border-red-600" : "border-white/10"
            } backdrop-blur-md transition-all`}
            variants={tabVariants}
            animate={activeTab === "meals" ? "active" : "inactive"}
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
          >
            <i className="fas fa-utensils pr-2"></i>
            MEALS
          </motion.button>
          
          <motion.button
            onClick={() => setActiveTab("shakes")}
            className={`px-8 py-4 rounded-xl font-bold gymfont text-lg ${
              activeTab === "shakes" ? "text-white" : "text-white/70"
            } border-2 ${
              activeTab === "shakes" ? "border-red-600" : "border-white/10"
            } backdrop-blur-md transition-all`}
            variants={tabVariants}
            animate={activeTab === "shakes" ? "active" : "inactive"}
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
          >
            <i className="fas fa-blender pr-2"></i>
            SHAKES
          </motion.button>
        </motion.div>

        {/* Items Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {renderItems()}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
"use client";

import React from "react";
import { Hammer, Home, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function UnderConstruction() {
  return (
    <>
      {/* Black background */}
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 overflow-hidden relative">
        
        {/* Animated purple blob background */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-30"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-700 rounded-full blur-3xl opacity-30"
        />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-2xl w-full text-center space-y-12"
        >
          {/* Hammer with crazy motion */}
          <motion.div
            animate={{
              y: [0, -30, 0],
              rotate: [0, -10, 10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex justify-center"
          >
            <motion.div
              whileHover={{ rotate: 360, scale: 1.3 }}
              transition={{ duration: 0.6 }}
            >
              <Hammer className="w-32 h-32 md:w-40 md:h-40 text-purple-500 drop-shadow-2xl" />
            </motion.div>
          </motion.div>

          {/* Title with stagger animation */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-8xl font-black tracking-tighter"
            >
              <motion.span
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                className="inline-block bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent"
              >
                Sahifa
              </motion.span>{" "}
              <motion.span
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
                className="inline-block bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent"
              >
                ishlab chiqilmoqda
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-xl md:text-2xl text-purple-300 flex items-center justify-center gap-3"
            >
              <Zap className="w-7 h-7 text-purple-500 animate-pulse" />
              Tez orada epik yangilanish bilan qaytamiz
              <Zap className="w-7 h-7 text-purple-500 animate-pulse" />
            </motion.p>
          </div>

          {/* Button with insane hover */}
          <motion.a
            href="/"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-4 px-12 py-6 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xl rounded-full shadow-2xl shadow-purple-600/50 transition-all duration-300 group"
          >
            <Home className="w-7 h-7 group-hover:-translate-x-2 transition" />
            Bosh sahifaga qaytish
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </motion.a>

          {/* Loading bar vibe */}
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "85%" }}
            transition={{ delay: 1.5, duration: 3, ease: "easeInOut" }}
            className="mx-auto max-w-xs h-2 bg-purple-900 rounded-full overflow-hidden"
          >
            <motion.div
              animate={{ x: ["0%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-full w-1/3 bg-purple-500 rounded-full"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="text-purple-400 font-medium"
          >
            Almost there... <span className="text-purple-300">85%</span>
          </motion.p>
        </motion.div>
      </div>
    </>
  );
}
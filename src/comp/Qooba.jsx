import { useState } from 'react'

export default function Qooba() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const handleSend = () => {
    if (!name || !phone) {
      alert('من فضلك أدخل الاسم ورقم الهاتف')
      return
    }

    const message = `مرحباً، أنا ${name}\nرقم الهاتف: ${phone}\nأريد حجز خصم الاشتراك 🎉`
    const whatsappNumber = '201100552674' // ضع رقم الواتساب الخاص بك هنا
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="min-h-screen bg-red-600 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* العنوان الرئيسي */}
        <div className="text-center my-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            احجز خصم اشتراكك دلوقتي! 🔥
          </h1>
          <p className="text-xl md:text-2xl text-white/90">
            عرض خاص لفترة محدودة
          </p>
        </div>

        {/* قسم الجوائز */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-2xl mx-auto">
          <div className="bg-white rounded-lg p-6 text-center shadow-xl">
            <div className="text-5xl mb-3">🎁</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">خصم</h3>
            <p className="text-gray-600">على أول اشتراك</p>
          </div>

          <div className="bg-white rounded-lg p-6 text-center shadow-xl">
            <div className="text-5xl mb-3">🏆</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">هدية</h3>
            <p className="text-gray-600">كرياتين مجاني</p>
          </div>
        </div>

        {/* فورم الحجز */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            سجل بياناتك واحجز الخصم 🎉
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-lg">
                الاسم
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="أدخل اسمك"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600 text-lg"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-lg">
                رقم الهاتف
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="أدخل رقم هاتفك"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-600 text-lg"
              />
            </div>

            <button
              onClick={handleSend}
              className="w-full bg-red-600 text-white font-bold py-4 px-6 rounded-lg text-xl hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              احجز الآن على الواتساب 📱
            </button>
          </div>
        </div>

        {/* معلومات إضافية */}
        <div className="text-center mt-8 text-white mb-32 pb-12">
          <p className="text-lg mb-24">⏰ العرض لفترة محدودة - اغتنم الفرصة!</p>
        </div>
      </div>
    </div>
  )
}

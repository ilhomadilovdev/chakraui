import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Main from './pages/Main'
import Home from './pages/Home'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsauth } from './redux/Slices/authSlice'
import Sidebar from './components/Sidebar'

import Tovarlar from './pages/Tovarlar'
import Xaridlar from './pages/Taminotchi/Xaridlar'

import Jarayondagilar from './pages/Taminotchi/Jarayondagilar'
import Tekshiruvdan_otdi from './pages/Taminotchi/Tekshiruvdan_otdi'
import Tekshiruvdan_otmadi from './pages/Taminotchi/Tekshiruvdan_otmadi'
import Qabul_qilinganlar from './pages/Taminotchi/Qabul_qilinganlar'
import Tugallangan_xaridlar from './pages/Taminotchi/Tugallangan_xaridlar'
import Yangi_buyurtmalar from './pages/YetkazibBeruvchiWebSayt/Yangi_buyurtmalar'
import Yetkazilgan from './pages/Yetkazilgan'
import Jarayonda_yetkazibberuvchi from './pages/YetkazibBeruvchiWebSayt/Jarayonda_yetkazibberuvchi'

import Jarayondanotdi_yetkazibberuvchi from './pages/YetkazibBeruvchiWebSayt/Jarayondanotdi_yetkazibberuvchi'
import Jarayondanotmadi_yetkazibberuvchi from './pages/YetkazibBeruvchiWebSayt/Jarayondanotmadi_yetkazibberuvchi'
import Tugallangan_sotuvlar from './pages/YetkazibBeruvchiWebSayt/Tugallangan_sotuvlar'
import Tolovlar_money from './pages/YetkazibBeruvchiWebSayt/Tolovlar_money'
import Kiruvchi_tolov from './pages/YetkazibBeruvchiWebSayt/Kiruvchi_tolov'
import Laborant_jarayonda from './pages/Laborant_mobil/Laborant_jarayonda'
import Laborant_qaytatekshirish from './pages/Laborant_mobil/Laborant_qaytatekshirish'
import Laborant_tekshiruvdanotdi from './pages/Laborant_mobil/Laborant_tekshiruvdanotdi'

import Laborant_tekshiruvdanotmadi from './pages/Laborant_mobil/Laborant_tekshiruvdanotmadi'
//import LaborantDocentry from './pages/idpages/LaborantDocentry'
import Jarayonda from './pages/Bosh_laborant/Jarayonda'
import Koribchiqish from './pages/Bosh_laborant/Koribchiqish'
import Tekshiruvdanotdi from './pages/Bosh_laborant/Tekshiruvdanotdi'
import Tekshiruvdanotmadi from './pages/Bosh_laborant/Tekshiruvdanotmadi'

import Labaratoriya_tekshiruvidan_otdi from './pages/Ombor_mudiri/Labaratoriya_tekshiruvidan_otdi'
import Jonatildi from './pages/Ombor_mudiri/Jonatildi'
import Xaridtugallandi from './pages/Ombor_mudiri/Xaridtugallandi'
import Xaridga_buyurtma from './pages/Moliya/Xaridga_buyurtma'
import Yetkazish from './pages/Moliya/Yetkazish'
import Laborantkorigi from './pages/Moliya/Laborantkorigi'
import Korikdan_otdi from './pages/Moliya/Korikdan_otdi'

import Yuklangan from './pages/Moliya/Yuklangan'
import Xaridtugallanishi from './pages/Moliya/Xaridtugallanishi'
import Sotib_olish from './pages/Ishlab_chiqarish_websayt/Sotib_olish'
import Korikda from './pages/Ishlab_chiqarish_websayt/Korikda'
import TugallanganXaridlar from './pages/Ishlab_chiqarish_websayt/TugallanganXaridlar'
import YetkazilganIshlabChiqarish from './pages/Ishlab_chiqarish_websayt/YetkazilganIshlabChiqarish'
import { getMe } from './redux/Slices/getmeSlice'
import YetkazilganLaborant from './pages/Laborant_mobil/YetkazilganLaborant'
import YetkazilganBoshLaborant from './pages/Bosh_laborant/YetkazilganBoshLaborant'




function App() {

  const isAuth = useSelector(checkIsauth)

  const dispatch = useDispatch()
  useEffect(() => {

    dispatch(getMe())


  }, [])
  return (
    <>
      <div className='flex'>
        {
          isAuth && <Sidebar />
        }
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='to' element={<Home />} />
        
          <Route path='tovarlar' element={<Tovarlar />} />
          <Route path='xaridlar' element={<Xaridlar />} />

          <Route path='jarayondagilar' element={<Jarayondagilar />} />
          <Route path='tekshiruv_otdi' element={<Tekshiruvdan_otdi />} />
          <Route path='tekshiruv_otmadi' element={<Tekshiruvdan_otmadi />} />
          <Route path='qabul_qilinganlar' element={<Qabul_qilinganlar />} />
          <Route path='tugallangan_xaridlar' element={<Tugallangan_xaridlar />} />

          <Route path='new_buyurtma' element={<Yangi_buyurtmalar />} />
          <Route path='jarayonda_yetkazib-beruvchi' element={<Jarayonda_yetkazibberuvchi />} />
          <Route path='yetkazilgan' element={<Yetkazilgan />} />
          <Route path='jarayondan_otdi_yetkazib' element={<Jarayondanotdi_yetkazibberuvchi />} />
          <Route path='jarotmadiyetkazib' element={<Jarayondanotmadi_yetkazibberuvchi />} />
          <Route path='sotuvlar' element={<Tugallangan_sotuvlar />} />
          <Route path='tolovlar' element={<Tolovlar_money />} />

          <Route path='kiruvchi-tolov' element={<Kiruvchi_tolov />} />


          <Route path='laborant-jarayon' element={<Laborant_jarayonda />} />
          <Route path='laborant-qaytatekshirish' element={<Laborant_qaytatekshirish />} />
          <Route path='laborant-tekshiruvdanotdi' element={<Laborant_tekshiruvdanotdi />} />
          <Route path='laborant-tekshiruvdanotmadi' element={<Laborant_tekshiruvdanotmadi />} />
          <Route path='laborant-yetkazilgan' element={<YetkazilganLaborant />} />







          {/* //chala <Route path='laborant/:docEntry' element={<LaborantDocentry/>}/> */}

          <Route path='boshlaborant-jarayon' element={<Jarayonda />} />
          <Route path='boshlaborant-koribchiqish' element={<Koribchiqish />} />
          <Route path='boshlaborant-otdi' element={<Tekshiruvdanotdi />} />
          <Route path='boshlaborant-otmadi' element={<Tekshiruvdanotmadi />} />
          <Route path='boshlaborant-yetkazilgan' element={<YetkazilganBoshLaborant/>}/>




          <Route path='lab-tekshiruvdan-otdi' element={<Labaratoriya_tekshiruvidan_otdi />} />
          <Route path='jonatildi' element={<Jonatildi />} />
          <Route path='xarid-tugallandi' element={<Xaridtugallandi />} />




          {/* //Moliya */}
          <Route path='moliya-xaridga-buyurtma' element={<Xaridga_buyurtma />} />
          <Route path='moliya-yetkazish' element={<Yetkazish />} />
          <Route path='moliya-laborant-korigi' element={<Laborantkorigi />} />
          <Route path='moliya-korikdanotdi' element={<Korikdan_otdi />} />
          <Route path='moliya-yuklangan' element={<Yuklangan />} />
          <Route path='moliya-xaridtugadi' element={<Xaridtugallanishi />} />



          {/* Ishlab chiqarish direktori */}


          <Route path='ishlabchiqarish-xaridga-buyurtma' element={<Sotib_olish />} />
          <Route path='ishlabchiqarish-yetkazish' element={<YetkazilganIshlabChiqarish />} />
          <Route path='ishlabchiqarish-korik' element={<Korikda />} />
          <Route path='ishlabchiqarish-tugallangan-xaridlar' element={<TugallanganXaridlar />} />

        </Routes>
      </div>
    </>

  )
}

export default App
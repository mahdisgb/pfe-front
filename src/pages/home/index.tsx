import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetIdentity, useTranslation } from '@refinedev/core';

export const Home = () => {
    const navigate = useNavigate();
    const { translate: t } = useTranslation();
    const{data:user}=useGetIdentity<any>();
    return (
        <div className="text-gray-800 font-sans">
            {/* Hero */}
            <section style={{background: "linear-gradient(135deg, #1e55a9 0%, #0e3b7c 100%)"}} className="text-white px-8 py-16 text-center flex items-center justify-center">
                <div className="flex flex-col items-start">
                    <h1 className="text-3xl font-bold mb-4 text-start max-w-[30ch]">
                        {t('home.hero.title')}
                    </h1>
                    <p className="text-lg mb-4 text-start max-w-[49ch]">
                        {t('home.hero.description')}
                    </p>
                    <Button onClick={() => user ? navigate("/courses") : navigate("/login")} type="primary" size="large">
                        {t('home.hero.startNow')}
                    </Button>
                    <p className="text-md mt-2">{t('home.hero.subjects')}</p>
                </div>
                <div>
                    <img src="bg2.png" className="w-[300px] h-[300px]" alt="" />
                </div>
            </section>

            {/* Course Options */}
            <section className="py-16 bg-white text-center">
                <h2 className="text-2xl font-bold mb-8">{t('home.languageCourses.title')}</h2>
                <div className="flex justify-center items-center gap-4">
                    <div key={1} className="border rounded-lg p-4 hover:shadow cursor-pointer">
                        <p className="text-3xl">🇬🇧</p>
                        <p className="mt-2 text-sm">{t('home.languageCourses.english')}</p>
                    </div>
                    <div key={2} className="border rounded-lg p-4 hover:shadow cursor-pointer">
                        <p className="text-3xl">🇫🇷</p>
                        <p className="mt-2 text-sm">{t('home.languageCourses.french')}</p>
                    </div>
                    <div key={3} className="border rounded-lg p-4 hover:shadow cursor-pointer">
                        <p className="text-3xl">🇸🇦</p>
                        <p className="mt-2 text-sm">{t('home.languageCourses.arabic')}</p>
                    </div>
                </div>
                <div className="mt-10">
                    <Button onClick={() => user ? navigate("/courses") : navigate("/login")} className="w-[200px]" type="primary" size="large">
                        {t('home.languageCourses.enrollNow')}
                    </Button>
                </div>
            </section>

            {/* Competences */}
            <section className="py-12 text-center bg-gray-50">
                <h3 className="text-xl font-semibold mb-4">{t('home.competences.title')}</h3>
                <div className="flex justify-center flex-wrap gap-4 px-4">
                    {[
                        t('home.competences.categories.language'),
                        t('home.competences.categories.examPrep'),
                        t('home.competences.categories.professional'),
                        t('home.competences.categories.children'),
                        t('home.competences.categories.others')
                    ].map((label, i) => (
                        <button key={i} className="px-4 py-2 border rounded-full hover:bg-blue-100">
                            {label}
                        </button>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section className="py-16 px-4 text-center bg-white">
                <h3 className="text-xl font-semibold mb-4">{t('home.features.title')}</h3>
                <div className="grid md:grid-cols-4 gap-6 mt-8">
                    {[
                        { title: t('home.features.items.flexibility.title'), description: t('home.features.items.flexibility.description') },
                        { title: t('home.features.items.teachers.title'), description: t('home.features.items.teachers.description') },
                        { title: t('home.features.items.goals.title'), description: t('home.features.items.goals.description') },
                        { title: t('home.features.items.exercises.title'), description: t('home.features.items.exercises.description') }
                    ].map((item, i) => (
                        <div key={i} className="p-4 border rounded-lg">
                            <h4 className="font-bold mb-2">{item.title}</h4>
                            <p className="text-sm">{item.description}</p>
                        </div>
                    ))}
                </div>
                {/* <div className="mt-8">
                    <Button onClick={() => user ? navigate("/courses") : navigate("/login")} className="w-[200px]" type="primary" size="large">
                        {t('home.features.enrollNow')}
                    </Button>
                </div> */}
            </section>

            {/* How It Works */}
            <section className="py-16 px-6 bg-gray-50 text-center">
                <h3 className="text-xl font-semibold mb-4">{t('home.howItWorks.title')}</h3>
                <div className="grid md:grid-cols-3 gap-6 mt-6 text-left">
                    <div>
                        <h4 className="font-bold">{t('home.howItWorks.steps.findTeacher.title')}</h4>
                        <p>{t('home.howItWorks.steps.findTeacher.description')}</p>
                    </div>
                    <div>
                        <h4 className="font-bold">{t('home.howItWorks.steps.chooseTime.title')}</h4>
                        <p>{t('home.howItWorks.steps.chooseTime.description')}</p>
                    </div>
                    <div>
                        <h4 className="font-bold">{t('home.howItWorks.steps.learnFromHome.title')}</h4>
                        <p>{t('home.howItWorks.steps.learnFromHome.description')}</p>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-12 bg-blue-900 text-white text-center">
                <h3 className="text-xl font-semibold mb-4">{t('home.testimonials.title')}</h3>
                <div className="flex justify-center gap-8 mt-8">
                    <div className="max-w-xs">
                        <p className="italic">{t('home.testimonials.testimonials.david.text')}</p>
                        <p className="mt-2 font-bold">{t('home.testimonials.testimonials.david.name')}</p>
                    </div>
                    <div className="max-w-xs">
                        <p className="italic">{t('home.testimonials.testimonials.fatima.text')}</p>
                        <p className="mt-2 font-bold">{t('home.testimonials.testimonials.fatima.name')}</p>
                    </div>
                </div>
            </section>
        </div>
    );
}


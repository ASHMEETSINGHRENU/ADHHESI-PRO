import React, { useState, useEffect } from 'react';
import { Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import Breadcrumbs from '../components/Breadcrumbs';
import AchievementCard from '../components/AchievementCard';
import { Loader } from '../components/Loader';
import API from '../services/api';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await API.get('/achievements');
        setAchievements(res.data?.data || []);
      } catch (err) {
        console.error('Failed to load achievements', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  return (
    <>
      <SEO
        title="Achievements & Milestones | Track Record"
        description="Chronological growth, manufacturing capacity enhancements, and quality milestones achieved by ADHHESI PRO."
      />

      <Breadcrumbs items={[{ label: 'Achievements' }]} />

      <section className="bg-brand-navy text-white py-14 sm:py-18 border-b-2 border-brand-yellow">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-brand-yellow border border-brand-yellow/30">
              <Award className="w-4 h-4" />
              GROWTH TIMELINE
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Company Achievements & Milestones
            </h1>
            <p className="text-base text-gray-200">
              Celebrating our ongoing trajectory of compounding capability, product line expansion, and industrial trust.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <SectionHeading
            badge="PROGRESS THROUGH RIGOR"
            title="Our Growth Journey"
            subtitle="Each milestone reflects our dedication to the motto: Har Joint Mein Pro Strength."
            align="center"
          />

          {loading ? (
            <Loader text="Loading milestone history..." />
          ) : (
            <div className="mt-10">
              {achievements.map((item, idx) => (
                <AchievementCard
                  key={item._id}
                  achievement={item}
                  isLast={idx === achievements.length - 1}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Achievements;

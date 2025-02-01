import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { IoMdHome } from 'react-icons/io';
import { IoRestaurant } from 'react-icons/io5';
import { IoMdFitness } from 'react-icons/io';
import { GiWeightScale } from 'react-icons/gi';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[5rem] bg-navbar-main backdrop-blur-md border-t border-white/20">
      <div className="flex justify-around p-4 max-w-6xl mx-auto">
        <div className="text-navbar-iconNotSelect text-sm">
          <Link to="/user/signup">
            <div className="">
              <IoMdHome size="1.5rem" className="mx-auto" />
            </div>
            <div>{t('footer.home')}</div>
          </Link>
        </div>
        <div className="text-navbar-iconNotSelect text-sm">
          <div className="">
            <IoRestaurant size="1.5rem" className="mx-auto" />
          </div>
          <div>{t('footer.meal')}</div>
        </div>
        <div className="text-navbar-iconSelected text-sm">
          <Link to="/user/weight">
            <div className="">
              <GiWeightScale size="1.5rem" className="mx-auto" />
            </div>
            <div>{t('footer.body')}</div>
          </Link>
        </div>
        <div className="text-navbar-iconNotSelect text-sm">
          <Link to="/training/record">
            <div className="">
              <IoMdFitness size="1.5rem" className="mx-auto" />
            </div>
            <div>{t('footer.workout')}</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

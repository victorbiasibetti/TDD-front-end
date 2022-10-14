import { Footer, Logo } from '@/presentation/components'
import Styles from './survey-list-styles.scss'
import React from 'react'

const SurveyList: React.FC = () => {
  return (
  <div className={Styles.surveyListWrap}>
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span>Victor</span>
          <a href="#">Logout</a>
        </div>
      </div>
    </header>
    <div className={Styles.contentWrap}>
      <h2>Enquetes</h2>
      <ul>
        <li>
          <div className={Styles.surveyContent}>
            <div className={[Styles.iconWrap, Styles.green].join(' ')}>
              <img
                className={Styles.icon}
                src="" />

              </div>
            <time>
              <span className={Styles.day}>22</span>
              <span className={Styles.month}>10</span>
              <span className={Styles.year}>2022</span>
            </time>
            <p>Qual é seu framework web favorito?</p>
          </div>
          <footer>Ver Resultado</footer>
        </li>

      </ul>
    </div>
    <Footer />
  </div>
  )
}

export default SurveyList

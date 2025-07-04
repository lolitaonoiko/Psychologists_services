import s from './HeroSection.module.css';

const HeroSection = () => {
    return (
        <>
            <div className={s.heroBack}></div>
            <div className={s.heroBox}>
                <div className={s.articleBox}>
                    <h1 className={s.title}>
                        The road to the <span className={s.word}>depths</span> of the human soul
                    </h1>
                    <p className={s.text}>We help you to reveal your potential, overcome challenges and find a guide in your own life with the help of our experienced psychologists.</p>
                    <button className={s.btn}>
                        <span className={s.btnText}>Get started</span>
                        <svg className={s.arrowIcon}>
                            <use href="/public/icons/sprite.svg#icon-arrow"></use>
                        </svg>
                    </button>
                </div>
                <div className={s.imgBox}>
                    <picture>
                        <source srcSet="/public/images/hero-image@2x.png 2x, /public/images/hero-image.png 1x" />

                        <img className={s.img} src="/public/images/hero-image.png" alt="Photo of the psychologist" />
                    </picture>
                    <span className={s.questionBack}>
                        <svg className={s.questionIcon} width="10" height="17">
                            <use href="/public/icons/sprite.svg#icon-question"></use>
                        </svg>
                    </span>
                    <span className={s.usersBack}>
                        <svg className={s.usersIcon} width="25" height="25">
                            <use href="/public/icons/sprite.svg#icon-users"></use>
                        </svg>
                    </span>
                    <div className={s.decortnBox}>
                        <span className={s.decorCheck}>
                            <svg className={s.checkIcon} width="20" height="16">
                                <use href="/public/icons/sprite.svg#icon-check"></use>
                            </svg>
                        </span>
                        <p className={s.decorText}>Experienced psychologists</p>
                        <h3 className={s.decorTitle}>15,000</h3>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeroSection;

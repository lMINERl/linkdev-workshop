import React from "react";
import Decoration from "../../assets/Decore.svg?react";
import Play from "../../assets/Play.svg?react";
import Header from "../../layout/Header";
import { useAppDispatch, useAppSelector } from "../../Store";
import { getLandingDispatch, getMediaNewsDispatch, getNewsCategoryDispatch } from "../../Store/Thunk/GuestThunk";
import { GuestActions } from "../../Store/Slice/GuestSlice";
import Category from "../../assets/Category.png";
import Card from "../../components/Card";

const Home = () => {
  const [homeState, setHomeState] = React.useState({
    loading: false,
  });

  const dispatch = useAppDispatch();
  const {
    landing: landingData,
    media: mediaNews,
    newsCategory,
    selectedLanding,
    selectedCategory,
  } = useAppSelector((s) => s.guest);

  React.useEffect(() => {
    setHomeState((old) => {
      return { ...old, loading: true };
    });
    dispatch(getNewsCategoryDispatch()).then((v) => {
      Promise.all([dispatch(getMediaNewsDispatch()), dispatch(getLandingDispatch())]).finally(() => {
        setHomeState((old) => {
          return { ...old, loading: false };
        });
      });
    });
  }, [dispatch]);

  if (homeState.loading || !selectedLanding) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Header />
      <div className="home">
        <section className="home__landing bg-white">
          <div className="home__landing__content">
            <div className="home__landing__content__info">
              <div className="home__landing__content__info__hint" style={{ color: `#${selectedLanding.colorCode}` }}>
                {selectedLanding.category}
              </div>

              <div className="home__landing__content__info__title">{selectedLanding.title}</div>

              <div className="home__landing__content__info__description">{selectedLanding.brief}</div>

              <div className="home__landing__content__info__action-list">
                <div className="home__landing__content__info__action-list__item">
                  <button
                    className="button rtl-pl-m rtl-pr-m pt-s pb-s pl-m pr-m bg-orange border-m text-white typo typo--poppins-base"
                    styles={{ backgroundColor: `#${selectedLanding.colorCode}` }}
                  >
                    Find out more
                  </button>
                </div>

                <div className="home__landing__content__info__action-list__item">
                  <button className="button bg-transparent">
                    <div
                      className="bg-dark-orange p-s2 border-rounded"
                      style={{
                        width: "5.2rem",
                        height: "5.2rem",
                        marginLeft: "0.6rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Play style={{ fill: "var(--color-white)", width: "2.5rem", height: "2.5rem" }} />
                    </div>
                    <div className="typo typo--poppins-base text-dark-silver ml-m rtl-ml-unset rtl-mr-m">Play Demo</div>
                  </button>
                </div>
              </div>

              <div className="home__landing__content__info__navigation">
                <div className="home__landing__content__info__navigation-bullets">
                  {Array(500)
                    .fill(1)
                    .map((_, i) => {
                      return <React.Fragment key={i.toString()}>{"\u25CF"}</React.Fragment>;
                    })}
                </div>
                <div className="home__landing__content__info__navigation-page">
                  {landingData?.slides.map((v) => {
                    return (
                      <button
                        key={v.id.toString()}
                        className="button border-rounded"
                        style={{
                          width: v.id == selectedLanding.id ? "4rem" : "2rem",
                          height: v.id == selectedLanding.id ? "4rem" : "2rem",
                          backgroundColor: `#${v.colorCode}`,
                        }}
                        type="button"
                        onClick={() => {
                          dispatch(GuestActions.setSelectedLanding(v));
                        }}
                      ></button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="home__landing__content__display">
              <div className="home__landing__content__display__image"></div>
            </div>
          </div>
          <div className="home__landing__decoration">
            <Decoration className="home__landing__decoration__img" />
          </div>
        </section>
        <section className="home__category bg-light-gray">
          <div className="home__category__content">
            <div className="home__category__content__banner bg-true-pink">
              <div className="home__category__content__banner__content">
                <p className="home__category__content__banner__content__title text-dark-pink">
                  We Deliver Digital Productivity
                </p>
                <p className="home__category__content__banner__content__description text-white ">
                  We craft technology solutions that digitally bond and transform the productivity of our customers and
                  their citizens, workers, consumers and partners.
                </p>
              </div>
            </div>

            <div className="home__category__content__display text-white">
              <div className="home__category__content__display__item">
                <img src={Category} alt="category" style={{ width: "25rem", height: "25rem" }} />
              </div>
              <div className="home__category__content__display__item">
                <img src={Category} alt="category" style={{ width: "25rem", height: "25rem" }} />

                <img src={Category} alt="category" style={{ width: "25rem", height: "25rem" }} />
              </div>
              <div className="home__category__content__display__item">
                <img src={Category} alt="category" style={{ width: "25rem", height: "25rem" }} />

                <img src={Category} alt="category" style={{ width: "250rem", height: "25rem" }} />
              </div>
            </div>
          </div>
        </section>

        <section className="home__media">
          <div className="home__media__title">Media</div>

          <div className="home__media__headline">Top News</div>

          <div className="home__media__list">
            <button
              type="button"
              onClick={() => {
                dispatch(GuestActions.setSelectedCategory(undefined));
              }}
              style={{ minWidth: "12.3rem" }}
              className={`home__media__list__item button p-xs typo typo typo--nowarp border-m ${selectedCategory === undefined ? "bg-sky-blue text-white" : "bg-light-gray"}`}
            >
              All news
            </button>

            {newsCategory &&
              newsCategory?.map((v) => {
                return (
                  <button
                    type="button"
                    key={v.id}
                    style={{ minWidth: "12.3rem" }}
                    onClick={() => {
                      dispatch(GuestActions.setSelectedCategory(v));
                    }}
                    className={`home__media__list__item button  p-xs typo typo typo--nowarp border-m ${selectedCategory?.id == v.id ? "bg-sky-blue text-white" : "bg-light-gray"}`}
                  >
                    {v.name}
                  </button>
                );
              })}
          </div>

          <div className="home__media__listing">
            {mediaNews &&
              mediaNews.map((v) => {
                const d = new Date(v.publishedDate);
                const date = d.toLocaleDateString("en", { dateStyle: "long" });
                return (
                  <div key={v.id} className="home__media__listing__item">
                    <Card category={v.categoryName} image={v.urlToImage} title={v.title} date={date} />
                  </div>
                );
              })}
          </div>
        </section>
      </div>
    </>
  );
};
export default Home;

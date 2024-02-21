import React from "react";
import Decoration from "../../assets/Decore.svg?react";
import Play from "../../assets/Play.svg?react";
import Header from "../../layout/Header";
import { useAppDispatch, useAppSelector } from "../../Store";
import { getLandingDispatch } from "../../Store/Thunk/GuestThunk";
import { GuestActions } from "../../Store/Slice/GuestSlice";

const Home = () => {
  const [homeState, setHomeState] = React.useState({
    loading: false,
  });

  const dispatch = useAppDispatch();
  const landingData = useAppSelector((s) => s.guest.landing);

  const selectedLanding = useAppSelector((s) => s.guest.selectedLanding);

  React.useEffect(() => {
    setHomeState((old) => {
      return { ...old, loading: true };
    });
    dispatch(getLandingDispatch()).finally(() => {
      setHomeState((old) => {
        return { ...old, loading: false };
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
                    className="button pt-s pb-s pl-m pr-m bg-orange border-m text-white typo typo--poppins-base"
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
                    <div className="typo typo--poppins-base text-dark-silver ml-m">Play Demo</div>
                  </button>
                </div>
              </div>

              <div className="home__landing__content__info__navigation">
                <div className="home__landing__content__info__navigation-bullets">
                  {Array(500)
                    .fill(1)
                    .map(() => {
                      return "\u25CF";
                    })
                    .join(" ")}
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
      </div>
    </>
  );
};
export default Home;

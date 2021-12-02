import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import LogoImg from 'assets/logo.svg';
import PickeCartNav from 'components/PickCartNav';
import Card from 'components/Card';
import Search from 'assets/search.svg';
import useAPI from 'cores/hooks/useAPI';

function PickPage() {
  const { data, loading } = useAPI({
    method: 'GET',
    url: '/coffee',
  });
  const containerRef = useRef(null);
  const location = useLocation();
  const selectedCard = location.state.selectedCard;
  const categories = location.state.categories;

  const [selectCtg, setSelectCtg] = useState(selectedCard === 'coffee' ? 'Coffee' : '한식');
  const [coEatList, setCoEatList] = useState({});
  const [noEatList, setNoEatList] = useState({});

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  const handleClick = (e) => {
    setSelectCtg(e.target.innerText);
  };

  const showCtg = () => <header>{selectCtg}</header>;

  useEffect(() => {
    showCtg();
  }, []);

  return (
    <StyledContainer ref={containerRef} isOpen={isOpen}>
      <nav>
        <div className="wrapper">
          <div className="title">
            <img src={LogoImg} alt="logo" />
          </div>
          <div className="categories">
            <div className="category">
              {categories.map((category, idx) => (
                <div onClick={handleClick} key={idx}>
                  {category}
                </div>
              ))}
            </div>
            <div className="search">
              <input type="text" placeholder="검색하기" />
              <img src={Search} alt="search" />
            </div>
          </div>
        </div>
      </nav>
      <section>
        <div className="wrapper_section">
          {showCtg()}
          <article className="ctgFoods">
            {data &&
              !loading &&
              data
                .filter((drink) => drink.category === selectCtg)
                .map((drinkInfo) => (
                  <Card key={drinkInfo.id} setCoEatList={setCoEatList} setNoEatList={setNoEatList} data={drinkInfo} />
                ))}
          </article>
        </div>
      </section>
      <PickeCartNav
        coEatList={coEatList}
        noEatList={noEatList}
        containerRef={containerRef}
        isOpen={isOpen}
        toggleModal={toggleModal}
      />
    </StyledContainer>
  );
}

export default PickPage;

const StyledContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: ${(prop) => (prop.isOpen ? 'hidden' : 'auto')};

  & > nav {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 26rem;
  }

  .wrapper {
    width: 120rem;
    height: 100%;
  }

  .title {
    margin-top: 4rem;
    padding: 6.3rem 0;
  }

  .title img {
    width: 10.9rem;
    height: 3.7rem;
  }

  .categories {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0.1rem solid #f4f5f6;
  }

  .category {
    display: flex;
    width: 100%;
  }

  .category div {
    color: #989898;
    font-size: 2.8rem;
    margin-right: 4.6rem;
    padding-bottom: 0.9rem;
  }

  .category div:hover {
    color: #ff7a00;
    border-bottom: 0.5rem solid #ff7a00;
    font-weight: 700;
  }
  .search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 45.1rem;
    height: 5.6rem;
    background-color: #f4f5f6;
    margin-bottom: 0.9rem;
    border-radius: 1rem;
  }

  .search input {
    background-color: #f4f5f6;
    height: 2.4rem;
    font-size: 2rem;
    border: none;
    outline: none;
    margin-left: 2.9rem;
    color: #ff7a00;
  }
  .search img {
    width: 2.1rem;
    margin-right: 1.7rem;
  }

  & > section {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  .wrapper_section {
    margin-top: 6rem;
    margin-bottom: 2.1rem;
    width: 120rem;
    font-size: 2.4rem;
    font-weight: 700;
  }

  .wrapper_section header {
    margin-bottom: 2.1rem;
  }

  .ctgFoods {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 3rem;
  }
`;

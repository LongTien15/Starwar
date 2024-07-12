import { useEffect, useState } from 'react'
import './App.scss'
import { Character } from './model/Character'
import axios from 'axios'
import Loading from './components/Loading'
import CharacterCard from './components/card/Card'
import { Pagination } from 'antd'
import DetailModal from './components/detail-modal/DetailModal'
import Error from './components/error/Error'

const URL = 'https://swapi.dev/api/people'

function App() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)
  const [isModalOpen, setIsOpen] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<Character | null>(null)
  const fetchData = async () => {
    try {
      const response = await axios(`${URL}/?page=${currentPage}`)

      if (response.status === 200) {
        setTotal(response?.data?.count)
        setCharacters(response?.data?.results)
        setLoading(false)
      } else {
        // response error
        setLoading(false)

        setIsError(true)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)

      setIsError(true)
    }
  }

  useEffect(() => {
    fetchData()
  }, [currentPage])

  return loading ? (
    <Loading />
  ) : isError ? (
    <Error />
  ) : (
    <>
      <div className="main">
        <div className={`${!loading && 'animation'}`}>
          <div className="main__row">
            {characters.length > 0 &&
              characters.map((item, index) => (
                <div
                  className="main__row__col"
                  key={index}
                  onClick={() => {
                    setSelectedItem(item)
                    setIsOpen(true)
                  }}
                >
                  <CharacterCard data={item} />
                </div>
              ))}
          </div>
          <Pagination
            style={{ marginTop: '30px' }}
            total={total}
            current={currentPage}
            onChange={(page) => {
              setLoading(true)
              setCurrentPage(page)
            }}
            showSizeChanger={false}
            align="center"
          />
        </div>
      </div>
      {isModalOpen && (
        <DetailModal
          open={isModalOpen}
          data={selectedItem}
          setOpen={setIsOpen}
        />
      )}
    </>
  )
}

export default App

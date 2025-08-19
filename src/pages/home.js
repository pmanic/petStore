import PetsList from '../components/petsList/petsList';

/**
 * React component for the home page.
 * @component
 */
const Home = () => {
    return <div className='page-layout home'>
        <PetsList />
    </div>
}

export default Home

import Carrousel from '../../components/carroussel/carrousel';
import ShoppingCart from '../../components/shoppingCart/shoppingCart';
import { fetchCompatibilityBy, fetchComponentCompatibleBetweenThem } from '../../lib/bikeService';
import styles from './customizer.module.css';

export default async function Customizer({ searchParams }) {
    const bikeId = Number(searchParams?.bike);
    const frames = searchParams?.frames;
    const batteriesId = searchParams?.batteries;
    const wheelsId = searchParams?.wheels;

    let compatibleComponents = {};
    let compatibleComponentsWith = {};
    let mergedComponents = {}

    if (isNaN(bikeId) || bikeId <= 0) {
        return <div className={styles.titles}>
            <h1 className={styles.mainTitle}>Design Your Dream Bike</h1>
            <h4 className={styles.secondTitle}>To start configuring your bike, begin by selecting the type of bike.</h4>
        </div>
    }

    if (bikeId) {
        compatibleComponents = await fetchComponentCompatibleBetweenThem(searchParams);
        mergedComponents = { ...compatibleComponents }
    }

    if (wheelsId) {
        compatibleComponentsWith = await fetchCompatibilityBy('wheels', wheelsId, bikeId);
        if (Object.keys(compatibleComponentsWith).length > 0) {
            mergedComponents = { ...mergedComponents, ...compatibleComponentsWith }
        } else {
            mergedComponents.handlebars = []
        }
    }

    if (batteriesId) {
        compatibleComponentsWith = await fetchCompatibilityBy('batteries', batteriesId, bikeId);
        if (Object.keys(compatibleComponentsWith).length > 0) {
            mergedComponents = { ...mergedComponents, ...compatibleComponentsWith }
        } else {
            mergedComponents.motors = []
        }
    }

    return (
        <section className={styles.mainContainer}>
            {bikeId && Object.values(compatibleComponents).length > 0 ? (
                <>
                    <div className={styles.carouselColumn}>
                        {showCarousel(compatibleComponents.frames, 'frames')}

                        {frames &&
                            showCarousel(mergedComponents.wheels, 'wheels')
                        }

                        {wheelsId &&
                            showCarousel(mergedComponents.handlebars, 'handlebars')
                        }

                        {frames &&
                            showCarousel(mergedComponents.batteries, 'batteries')
                        }

                        {batteriesId &&
                            showCarousel(mergedComponents?.motors, 'motors')
                        }

                        {frames &&
                            showCarousel(mergedComponents?.paints, 'paints')
                        }

                    </div>
                    <div className={styles.cartColumn}>
                        <ShoppingCart />
                    </div>
                </>
            ) :
                <div className={styles.titles}>
                    <h4 className={styles.secondTitle}>Currently, we do not have components for this item</h4>
                </div>}
        </section>
    );
}

function showCarousel(items, itemType) {
    if (!items || items.length === 0) {
        return <div key={itemType}>
            <h3 className={styles.title}>{itemType}</h3>
            <p className={styles.description}> No components available for this selection </p>
        </ div>;
    }
    return <div key={itemType}>
        <h3 className={styles.title}>{itemType}</h3>
        <Carrousel data={items} />
    </ div>;
}

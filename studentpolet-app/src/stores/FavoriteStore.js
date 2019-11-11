import { AsyncStorage } from 'react-native';
class FavoriteStore {
    //Observable
    favoriteIcon='md-heart-empty';


    //Action
    //Changes the favorite icon so it is up to date with the item the user is looking at
    setFavorite = async (itemNumber) => {
        try {
            let data = await AsyncStorage.getItem('Favorites') || [];
            data = JSON.parse(data);
  
            let found = false;
            for(let i = data.length - 1; i >= 0; i--) {
                if(data[i].Varenummer === itemNumber) {
                this.favoriteIcon='md-heart';
                found = true
                }
        }
        if (!found){
            this.favoriteIcon='md-heart-empty';
        }
        } catch (error){
            
        }
    }
}

export default FavoriteStore;

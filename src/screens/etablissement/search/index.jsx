//import liraries
import React from 'react';
import { Text, FlatList } from 'react-native';
import { styles } from './styles'
import Container from '@components/common/Container';
import SearchBar from '@components/SeachBar';
import { list_categorie } from 'src/mocks/categorie';
import CardCategorie from '@components/CardCategorie';

// create a component
const SearchScreen = ({navigation}) => {
    return (
        <Container title={"Recherche ..."}>
            <SearchBar />
            <Text style={styles.section_title}>Recherche par categorie</Text>
            <FlatList
                data={list_categorie}
                renderItem={({item}) => <CardCategorie item={item} navigation={navigation} />}
                numColumns={2}
                contentContainerStyle={{paddingBottom: 70}}
            />
        </Container>
    );
};

//make this component available to the app
export default SearchScreen;

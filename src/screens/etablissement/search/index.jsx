//import liraries
import React, { useRef, useState } from 'react';
import { Text, FlatList, View, ActivityIndicator } from 'react-native';
import { styles } from './styles'
import Container from '@components/common/Container';
import SearchBar from '@components/SeachBar';
import CardCategorie from '@components/CardCategorie';
import { useQuery } from 'react-query';
import { get_all_categorie } from 'src/feature/categorie/categorie.service';
import { search_service } from 'src/feature/service/service.service';
import { colors } from '@themes/index';
import CardItem from '@components/Card';
import Empty from '@components/Empty';

// create a component
const SearchScreen = ({navigation}) => {

    const [search_term, setSearchTerm] = useState('')
    const {data: list_all_categorie, isLoading: isLoadingAllCategorieService} = useQuery("all_categorie", get_all_categorie)
    const {data: list_results_search_service, isLoading: isLoadingSearchService, remove} = useQuery(
        ["SearchService", search_term], 
        search_service
    )
 
    const handleSearch = () => {
       setSearchTerm("")
    } 
  
    return (
        <Container>
            <View style={styles.container}>
                <SearchBar value={search_term} onChangeText={setSearchTerm} onSearch={handleSearch} />
                {
                    isLoadingSearchService &&
                    <View>
                        <ActivityIndicator color={colors.BLACK} size={'large'} />
                    </View>
                }
                
                {
                    Array.isArray(list_results_search_service?.result)?
                    <FlatList 
                        data={list_results_search_service?.result}
                        renderItem={({item}) => <CardItem item={item} />}
                        ListEmptyComponent={() => <Empty title={"Aucun service trouvé pour votre recherche"} />}
                        numColumns={2}
                        columnWrapperStyle={{gap: 10}}
                        style={styles.content}
                        contentContainerStyle={{paddingBottom: 70}}
                    />
                    :
                    <View>
                        <Text style={styles.section_title}>Recherche par catégorie</Text>
                        <FlatList
                            data={list_all_categorie?.results}
                            renderItem={({item}) => <CardCategorie item={item} navigation={navigation} />}
                            numColumns={2}
                            columnWrapperStyle={{gap: 20}}
                            contentContainerStyle={{paddingBottom: 70}}
                        />
                    </View>
                }
            </View>
        </Container>
    );
};

//make this component available to the app
export default SearchScreen;

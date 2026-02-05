import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../utils/color';
import { FONTS, HEIGHT, WIDTH } from '../../utils/dimension';
import { APP_FONTS } from '../../utils/fontFamily';
import DeviceInfo from 'react-native-device-info';

const isTablet = DeviceInfo.isTablet();
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    videoBox: {
        width: '100%',
        justifyContent: 'center',
        aspectRatio: 16 / 9,
        marginVertical: 10,
    },
    fullvideoBox: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(00, 00, 00, 0.9)',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    languageBox: {
        marginBottom: 5,
        height: isTablet ? 70 : HEIGHT.h07,
        padding: 5,
        marginTop: isTablet ? 20 : 10
    },
    gradientBorder: {
        padding: 1, // stroke width
        borderRadius: 9,
        marginRight: isTablet ? 20 : 10,

        // backgroundColor: 'red'
    },
    languageBoxView: {
        backgroundColor: COLORS.lightPrimaryColor,
        height: '98%',
        minWidth: isTablet ? 120 : 90,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        borderRadius: 8,
        // shadowColor: 'red',
        // marginBlock: 1,
        // shadowOffset: { width: 4, height: 2 },
        // shadowOpacity: 0.5, // 25% opacity
        // elevation: 2, // Required for Android shadow


    },
    channelListView: {
        flex: 1,
    },
    channelCategoriesListBox: {
        backgroundColor: COLORS.lightCream,
        width: '38%',
        height: '100%',
        borderRightWidth: 5,
        borderTopEndRadius: 15,
        borderBottomEndRadius: 15,
        borderRightColor: COLORS.borderColor,
        shadowColor: COLORS.lightActiveBox,
        shadowOffset: { width: 0, height: 4 }, // x: 0, y: 4
        shadowOpacity: 0.25, // 25% opacity
        shadowRadius: 0, // No blur effect
        elevation: 4,
        marginRight: '1%',
        paddingVertical: 5,
        paddingBottom: 10
    },
    channelListBox: {
        height: '100%',
        width: '60%',
        paddingVertical: 5,
        paddingBottom: 10
    },
    categoriesBoxView: {
        backgroundColor: COLORS.black,
        height: isTablet ? 63 : 45,
        width: '100%',
        justifyContent: 'center',
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25, // 25% opacity
        shadowRadius: 1, // blur
        elevation: 1,
    },
    categoriesBoxListView: {
        backgroundColor: COLORS.lightBlue,
        height: '93%',
        width: '100%',
        justifyContent: 'center',
        paddingLeft: isTablet ? 20 : 8,
        paddingRight: 5,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25, // 25% opacity
        shadowRadius: 1, // blur
        elevation: 2,
    },
    channelBoxView: {
        height: isTablet ? 63 : 45,
        justifyContent: 'center',
        borderBottomWidth: 0.4,
        borderBottomColor: COLORS.borderColor,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5, // 25% opacity
        shadowRadius: 1, // blur
        // elevation: 1,
    },
    row: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
    },
    FullSceen: {
        height: HEIGHT.h07,
        width: '96%',
        justifyContent: 'center',
        paddingHorizontal: 10,
        borderTopWidth: 2,
        borderTopColor: COLORS.borderColor,
    },
    channelIcin: {
        height: 50,
        width: 50,
        marginRight: 15,
        aspectRatio: 16 / 9,
    },
    channelName: {
        fontSize: FONTS.f16,
        fontFamily: APP_FONTS.PoppinsBold,
        color: COLORS.white,
    },
    categoriesName: {
        fontSize: FONTS.f16,
        fontFamily: APP_FONTS.PoppinsBold,
        color: COLORS.black,
        lineHeight: isTablet ? 55 : 37,
        height: '100%',
        paddingRight: isTablet ? 40 : 20,
    },
    fullScreenBox: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: 'rgba(00, 00, 00, 0.5)',
        padding: 10,
    },
    addToFavBox: {
        position: 'absolute',
        bottom: 15,
        right: 5,
        // backgroundColor: 'rgba(00, 00, 00, 0.5)',
        padding: 10,
    },
    addToFavLandScapeBox: {
        position: 'absolute',
        bottom: 20,
        right: 10,
        // backgroundColor: 'red',
        padding: 12,
    },
    favLogo: {
        height: 20,
        width: 20
    },

    videoContainer: {
        // flex: 1,
        pointerEvents: 'box-none', // Ensures that the Video component doesn't block touch events
        alignItems: 'center',
        justifyContent: 'center',
    },
    videoPotrait: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        aspectRatio: 16 / 9,
    },
    videoLandscape: {
        height: '100%',
        width: '100%',
        aspectRatio: 16 / 9,
    },
    listContainer: {
        position: 'absolute',
        top: 0, // Adjust according to where you want the list
        right: 0,
        bottom: 0,
        backgroundColor: '#04366BCC',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 5,
        width: isTablet ? 370 : 230,
        // backgroundColor: 'red'
    },
    channelBoxViewFullScreen: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: isTablet ? 78 : 55,
        marginVertical: 6,
        // borderBottomWidth: 2,

    },
    channelIcon: {
        height: '100%',
        width: '22%',
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    channelLogoIcon: {
        height: '90%',
        width: '95%',
    },
    videoView: {
        // height: '96%',
        // width: '100%',
        // aspectRatio: 16 / 9, 
    },
    landscapeVideoBoxView: {
        height: '100%',
        width: '100%',
        // backgroundColor: 'red',
        aspectRatio: 16 / 9,
        justifyContent: 'center',
        alignItems: 'center',
    },
    landScapeVideoView: {
        height: '100%',
        width: '100%',
        // aspectRatio: 16/9
    },

});

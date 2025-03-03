
import FooterPhoto1 from 'src/templates/photo-1/footer';
import HeroPhoto1 from 'src/templates/photo-1/hero';
import LayoutPhoto1 from 'src/templates/photo-1/layout';
import MenuPhoto1 from 'src/templates/photo-1/menu';
import SectionPhoto1 from 'src/templates/photo-1/section';

export default function EditorPreviewPage() {
    return (
        <>
            <LayoutPhoto1>
                <HeroPhoto1 />
                <MenuPhoto1 />
                <SectionPhoto1 />
                <FooterPhoto1 />
            </LayoutPhoto1>
        </>
    );
}

import { Button, Config, FieldProps } from '@measured/puck';
import ImageUploader from 'src/components/editor/ImageUploader';
import { useAppSelector } from 'src/hooks';
import FooterPhoto1 from 'src/templates/photo-1/footer';
import HeroPhoto1 from 'src/templates/photo-1/hero';
import LayoutPhoto1 from 'src/templates/photo-1/layout';
import MenuPhoto1 from 'src/templates/photo-1/menu';
import SectionPhoto1 from 'src/templates/photo-1/section';
import FormPhoto1, { FormField } from 'src/templates/photo-1/form';
import { openModal } from 'src/features/modal/modalSlice';
import { useDispatch } from 'react-redux';

export type Components = {
    HeroPhoto1: {
        title: string;
        name: string;
        imageUrl?: {
            field: object;
            value: string;
        };
    };
    MenuPhoto1: {
        children: string;
    };
    SectionPhoto1: {
        children: string;
    };
    FooterPhoto1: {
        children: string;
    };
    FormPhoto1: {
        formId?: string;
        formFields?: FormField[];
        submitButtonText?: string;
    };
};

type RootProps = {
    title: string;
};

export const photo1Config = (
    username: string
): Config<Components, RootProps> => ({
    components: {
        HeroPhoto1: {
            fields: {
                title: {
                    type: 'text',
                    label: 'Title',
                },
                name: {
                    type: 'text',
                    label: 'Full Name',
                },
                imageUrl: {
                    type: 'custom',
                    render: ({ field, value, onChange }: FieldProps) => (
                        <ImageUploader
                            value={value}
                            onChange={(url) => onChange({ field, value: url })}
                        />
                    ),
                },
            },
            defaultProps: {
                title: 'Demo Store',
                name: username || 'John Smith',
            },
            render: ({ title, name, imageUrl }) => {
                return (
                    <>
                        <HeroPhoto1
                            title={title}
                            name={name}
                            imageUrl={imageUrl}
                        ></HeroPhoto1>
                    </>
                );
            },
        },
        MenuPhoto1: {
            fields: {
                children: {
                    type: 'text',
                },
            },
            render: ({ children }) => {
                return (
                    <>
                        <MenuPhoto1></MenuPhoto1>
                    </>
                );
            },
        },
        SectionPhoto1: {
            fields: {
                children: {
                    type: 'text',
                },
            },
            render: ({ children }) => {
                return (
                    <>
                        <SectionPhoto1></SectionPhoto1>
                    </>
                );
            },
        },
        FooterPhoto1: {
            fields: {
                children: {
                    type: 'text',
                },
            },
            render: ({ children }) => {
                return (
                    <>
                        <FooterPhoto1></FooterPhoto1>
                    </>
                );
            },
        },
        FormPhoto1: {
            fields: {
                formId: {
                    type: 'text',
                    label: 'Form ID',
                },
                submitButtonText: {
                    type: 'text',
                    label: 'Submit Button Text',
                },
                formFields: {
                    type: 'custom',
                    label: 'Form Fields',
                    render: ({ field, value, onChange }: FieldProps) => {
                        const dispatch = useDispatch();

                        const handleOpenFormBuilder = () => {
                            // dispatch(
                            //     openModal({
                            //         componentName: 'FormBuilderModal',
                            //         props: {
                            //             formFields: value || [
                            //                 {
                            //                     id: 'email',
                            //                     label: 'Email',
                            //                     type: 'email',
                            //                     isRequired: true,
                            //                 },
                            //             ],
                            //         },
                            //     })
                            // );
                        };

                        return (
                            <div>
                                <Button onClick={handleOpenFormBuilder}>
                                    Configure Form Fields
                                </Button>
                                {value && value.length > 0 && (
                                    <div style={{ marginTop: 10 }}>
                                        <p>Fields: {value.length}</p>
                                        <ul>
                                            {value.map((field: FormField) => (
                                                <li key={field.id}>
                                                    {field.label} ({field.type})
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        );
                    },
                },
            },
            defaultProps: {
                formId: 'contact-form',
                submitButtonText: 'Submit',
                formFields: [
                    {
                        id: 'email',
                        label: 'Email',
                        type: 'email',
                        isRequired: true,
                    },
                ],
            },
            render: ({ formId, formFields, submitButtonText }) => {
                return (
                    <FormPhoto1
                        formId={formId}
                        formFields={formFields}
                        submitButtonText={submitButtonText}
                    />
                );
            },
        },
    },
    root: {
        fields: {
            title: {
                type: 'text',
            },
        },
        render: ({ children }) => {
            return (
                <>
                    <LayoutPhoto1>{children}</LayoutPhoto1>
                </>
            );
        },
    },
});

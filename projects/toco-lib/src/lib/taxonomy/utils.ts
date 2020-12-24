import { Term, VocabulariesInmutableNames } from "../entities/public-api";
import { PanelContent, FormFieldType, HintValue, HintPosition } from "../forms/public-api";

export class TermHelper {
  public static getPanelContentToEdit(term: Term) {
    // console.log(term);

    let result = null;
    if (term) {
      switch (term.vocabulary_id) {
        case VocabulariesInmutableNames.CUBAN_INTITUTIONS:
          result = [
            {
              name: "name",
              label: "Nombre",
              type: FormFieldType.text,
              required: true,
              value: term.identifier ? term.identifier : null,
              width: "100%"
            },
            {
              name: "grid",
              label: "Identificador GRID",
              type: FormFieldType.text,
              required: false,
              value: term.data["grid"] ? term.data["grid"] : null,
              width: "50%"
            },
            {
              name: "description",
              label: "Descripción",
              type: FormFieldType.textarea,
              required: false,
              value: term.description ? term.description : null,
              width: "100%"
            },
            {
              name: "email",
              label: "Email",
              type: FormFieldType.email,
              required: true,
              value: term.data["email"] ? term.data["email"] : null,
              width: "45%"
            },
            {
              name: "website",
              label: "Sitio Web Oficial",
              type: FormFieldType.url,
              required: false,
              value: term.data["website"] ? term.data["website"] : null,
              width: "45%"
            },
            {
              name: "address",
              label: "Dirección",
              type: FormFieldType.textarea,
              required: false,
              value: term.data["address"] ? term.data["address"] : null,
              width: "100%"
            },
            {
              name: "parent_id",
              label: "Jerarquía Institucional (Institución Superior)",
              type: FormFieldType.vocabulary,
              required: false,
              extraContent: {
                multiple: false,
                selectedTermsIds: term.parent_id ? [term.parent_id] : null,
                vocab: term.vocabulary_id
              },
              width: "100%"
            }
          ];
          break;
        case VocabulariesInmutableNames.INDEXES:
          result = [
            {
              name: "name",
              label: "Nombre",
              type: FormFieldType.text,
              required: true,
              value: term.identifier ? term.identifier : null,
              width: "100%"
            },
            {
              name: "url",
              label: "URL",
              type: FormFieldType.url,
              required: false,
              value: term.data["url"] ? term.data["url"] : null,
              width: "100%"
            },
            {
              name: "abrev",
              label: "Identificadores",
              type: FormFieldType.text,
              required: false,
              value: term.data["abrev"] ? term.data["abrev"] : null,
              width: "30%"
            },
            {
              name: "initial_cover",
              label: "Cobertura inicio",
              type: FormFieldType.text,
              required: false,
              value: term.data["initial_cover"]
                ? term.data["initial_cover"]
                : null,
              width: "30%"
            },
            {
              name: "end_cover",
              label: "Cobertura",
              type: FormFieldType.text,
              required: false,
              value: term.data["end_cover"] ? term.data["end_cover"] : null,
              width: "30%"
            },
            {
              name: "description",
              label: "Descripción",
              type: FormFieldType.textarea,
              required: false,
              value: term.description ? term.description : null,
              width: "100%"
            },
            {
              name: "miar_class",
              label: "Tipología de sistemas de indización",
              type: FormFieldType.vocabulary,
              required: false,
              extraContent: {
                multiple: false,
                selectedTermsIds: term.class_ids ? term.class_ids : null,
                vocab: VocabulariesInmutableNames.INDEXES_CLASIFICATION
              },
              width: "48%"
            },
            {
              name: "group_mes",
              label:
                "Grupos, Categorías según criterios de “calidad” de las publicaciones ",
              type: FormFieldType.vocabulary,
              startHint: new HintValue(HintPosition.start, ""),
              required: false,
              extraContent: {
                multiple: false,
                selectedTermsIds: term.class_ids ? term.class_ids : null,
                vocab: VocabulariesInmutableNames.INDEXES_CLASIFICATION
              },
              width: "48%"
            }
          ];
          break;
        default:
          result = [
            {
              name: "name",
              label: "Nombre",
              type: FormFieldType.text,
              required: true,
              width: "100%",
              value: term.identifier ? term.identifier : null
            },
            {
              name: "description",
              label: "Descripción",
              type: FormFieldType.textarea,
              required: false,
              width: "100%",
              value: term.description ? term.description : null
            },
            {
              name: "parent_id",
              label: "Término Padre",
              type: FormFieldType.vocabulary,
              startHint: new HintValue(HintPosition.start, ""),
              required: false,
              extraContent: {
                multiple: false,
                selectedTermsIds: term.parent_id ? [term.parent_id] : null,
                vocab: term.vocabulary_id
              },
              width: "50%"
            }
          ];
      }
    }
    return result;
  }
}

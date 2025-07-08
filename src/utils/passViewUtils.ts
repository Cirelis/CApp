import { v4 as uuid } from 'uuid';
import { IKeyValueControl, IWidget } from 'src/types/product';
import { _components, getWidgets } from 'src/_mock';

interface Lists {
  [key: string]: IWidget[];
}

export function reorder(
  list: IWidget[],
  startIndex: number,
  endIndex: number,
  drop: number
): IWidget[] {
  const result = Array.from(list);
  const sameDropItems = result.filter((item) => item.drop === drop);
  const indexMap = sameDropItems.map((item) => result.indexOf(item));
  const adjustedStartIndex = indexMap[startIndex];
  const adjustedEndIndex = indexMap[endIndex];
  const [removed] = result.splice(adjustedStartIndex, 1);
  result.splice(adjustedEndIndex, 0, removed);
  return result;
}

export function copy(
  item: IWidget,
  destination: IWidget[],
  droppableDestination: any,
  drop: number
): IWidget[] {
  // const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  // const item: IWidget = sourceClone[droppableSource.index];
  item.drop = drop;
  if (drop > 0) {
    droppableDestination.index += drop;
    destClone.splice(droppableDestination.index, 0, { ...item, id: `D${drop}:${uuid()}` });
  } else if (droppableDestination.index > 0) {
    destClone.splice(droppableDestination.index, 0, { ...item, id: `D${drop}:${uuid()}` });
  } else {
    destClone.splice(droppableDestination.index + 1, 0, { ...item, id: `D${drop}:${uuid()}` });
  }
  return destClone;
}

export function move(
  source: IWidget[],
  destination: IWidget[],
  droppableSource: any,
  droppableDestination: any
): Lists {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  if (droppableDestination.index > 0) {
    destClone.splice(droppableDestination.index, 0, removed);
  } else {
    destClone.splice(droppableDestination.index + 1, 0, removed);
  }
  return {
    [droppableSource.droppableId]: sourceClone,
    [droppableDestination.droppableId]: destClone,
  };
}

// Helper to update a non-translatable attribute's values
function updateNonTranslatableAttribute(
  attributeObj: any,
  langIdx: number,
  index: number,
  newValue: string
): void {
  attributeObj.value.forEach((item: any) => {
    if (item.val[index] === undefined) {
      item.val.push(newValue);
    } else if (attributeObj.feId !== 'ProductInfoNutrients') {
      item.val[index] = newValue;
    }
  });
  if (attributeObj.feId === 'ProductInfoNutrients') {
    const attrValues = attributeObj.value[langIdx].val;
    attrValues[index] = newValue;
  }
}

// Helper to update a translatable attribute's values for a given language index
function updateTranslatableAttribute(
  attributeObj: any,
  langIdx: number,
  index: number,
  newValue: string,
  isKey?: boolean,
  isValue?: boolean
): void {
  const attrValues = attributeObj.value[langIdx].val;
  if (attrValues[index] === undefined) {
    // Create a new entry if none exists at the given index
    const newEntry = { key: '', value: '' };
    if (isKey) {
      newEntry.key = newValue;
      attrValues.push(newEntry);
    } else if (isValue) {
      newEntry.value = newValue;
      attrValues.push(newEntry);
    } else {
      attrValues.push(newValue);
    }
  } else if (isKey) {
    attrValues[index].key = newValue;
  } else if (isValue) {
    attrValues[index].value = newValue;
  } else {
    attrValues[index] = newValue;
  }
}

function updateKeyValueTemplate(
  targetAttribute: any,
  tempAttribute: any,
  langIdx: number,
  index: number,
  newValue: string,
  isKey?: boolean,
  isValue?: boolean
): void {
  const newKeyValueTemp: IKeyValueControl = {
    keyTemp: true,
    valueTemp: true,
  };
  if (targetAttribute.keyValueTemp === undefined) {
    targetAttribute.keyValueTemp = [];
  }
  if (newValue === 'keyValueTemp:KeyTrue') {
    if (targetAttribute.keyValueTemp[index] === undefined) {
      newKeyValueTemp.keyTemp = true;
      targetAttribute.keyValueTemp.push(newKeyValueTemp);
    } else {
      targetAttribute.keyValueTemp[index].keyTemp = true;
    }
    const newKeyValue = targetAttribute.value[langIdx].val[index];
    const tempKey = tempAttribute?.value?.[langIdx]?.val?.[index]?.key;
    newKeyValue.key = tempKey;
    if (!targetAttribute.translate && tempKey !== undefined) {
      updateNonTranslatableAttribute(targetAttribute, langIdx, index, newKeyValue);
    } else if (targetAttribute.translate && tempKey !== undefined) {
      updateTranslatableAttribute(targetAttribute, langIdx, index, newKeyValue, isKey, isValue);
    }
  } else if (newValue === 'keyValueTemp:KeyFalse') {
    if (targetAttribute.keyValueTemp[index] === undefined) {
      newKeyValueTemp.keyTemp = false;
      targetAttribute.keyValueTemp.push(newKeyValueTemp);
    } else {
      targetAttribute.keyValueTemp[index].keyTemp = false;
    }
  } else if (newValue === 'keyValueTemp:ValueTrue') {
    if (targetAttribute.keyValueTemp[index] === undefined) {
      newKeyValueTemp.valueTemp = true;
      targetAttribute.keyValueTemp.push(newKeyValueTemp);
    } else {
      targetAttribute.keyValueTemp[index].valueTemp = true;
    }
    const newKeyValue = targetAttribute.value[langIdx].val[index];
    const tempValue = tempAttribute?.value?.[langIdx]?.val?.[index]?.value;
    newKeyValue.value = tempValue;
    if (!targetAttribute.translate && tempValue !== undefined) {
      updateNonTranslatableAttribute(targetAttribute, langIdx, index, newKeyValue);
    } else if (targetAttribute.translate && tempValue !== undefined) {
      updateTranslatableAttribute(targetAttribute, langIdx, index, newKeyValue, isKey, isValue);
    }
  } else if (newValue === 'keyValueTemp:ValueFalse') {
    if (targetAttribute.keyValueTemp[index] === undefined) {
      newKeyValueTemp.valueTemp = false;
      targetAttribute.keyValueTemp.push(newKeyValueTemp);
    } else {
      targetAttribute.keyValueTemp[index].valueTemp = false;
    }
  } else if (newValue === 'keyValueTemp:addKeyValue') {
    if (targetAttribute.keyValueTemp[index] === undefined) {
      targetAttribute.keyValueTemp.push(newKeyValueTemp);
    }
  } else if (newValue === 'keyValueTemp:clearKeyValue') {
    const removedObject = targetAttribute.keyValueTemp.splice(index, 1)[0];
  } else if (typeof newValue === 'string' && newValue.includes('keyValueTemp:reorderKeyValue')) {
    const parts = newValue.split('-');
    const [removed] = targetAttribute.keyValueTemp.splice(Number(parts[1]), 1);
    targetAttribute.keyValueTemp.splice(Number(parts[2]), 0, removed);
  }
}

export function updateValueWidget(
  widgetList: Lists,
  newValue: string,
  child: number,
  selectedLabel: number,
  selectedDrop: number,
  attribute: string,
  index: number,
  langIdx: number,
  templateWidgets: IWidget[],
  isKey?: boolean,
  isValue?: boolean
) {
  // Create a shallow copy of the widget list
  const updatedLists = { ...widgetList };

  Object.keys(updatedLists).forEach((key) => {
    const allWidgets = updatedLists[key];
    // Filter widgets based on the provided drop value
    const filteredWidgets = allWidgets.filter((widget) => widget.drop === selectedDrop);

    // Proceed only if the selected widget exists and has children
    if (
      Array.isArray(filteredWidgets) &&
      filteredWidgets[selectedLabel] &&
      filteredWidgets[selectedLabel].childs
    ) {
      // Copy the selected widget to avoid mutating the original
      const widgetCopy = { ...filteredWidgets[selectedLabel] };
      const targetAttribute = widgetCopy.childs[child]?.attributes?.[attribute];
      const tempObj =
        templateWidgets?.[selectedLabel]?.childs?.[child]?.attributes?.[targetAttribute?.feId];
      if (attribute === 'show') {
        widgetCopy.childs[child].show = Boolean(newValue);
      } else if (newValue === 'templateTrue') {
        targetAttribute.template = true;
        if (!targetAttribute.translate && tempObj !== undefined) {
          updateNonTranslatableAttribute(
            targetAttribute,
            langIdx,
            index,
            tempObj.value[langIdx].val[index]
          );
        } else if (targetAttribute.translate && tempObj !== undefined) {
          updateTranslatableAttribute(
            targetAttribute,
            langIdx,
            index,
            tempObj.value[langIdx].val[index],
            isKey,
            isValue
          );
        }
      } else if (newValue === 'templateFalse') {
        targetAttribute.template = false;
      } else if (typeof newValue === 'string' && newValue.includes('keyValueTemp:')) {
        updateKeyValueTemplate(targetAttribute, tempObj, langIdx, index, newValue);
      } else if (targetAttribute !== undefined) {
        if (!targetAttribute.translate) {
          updateNonTranslatableAttribute(targetAttribute, langIdx, index, newValue);
        } else {
          updateTranslatableAttribute(targetAttribute, langIdx, index, newValue, isKey, isValue);
        }
      }
      // Update the widget in the filtered list with the modified copy
      filteredWidgets[selectedLabel] = widgetCopy;
    }
  });

  return updatedLists;
}

export function updateAccordionOrder(
  obj: Lists,
  selectedLabel: number,
  selectedDrop: number,
  currentIndex: number,
  newIndex: number
) {
  const selectedIndex: number = selectedLabel;

  const updatedLists = { ...obj };

  Object.keys(updatedLists).forEach((key) => {
    const allWidgets = updatedLists[key];
    const item = allWidgets.filter((widget) => widget.drop === selectedDrop);

    if (Array.isArray(item) && item[selectedIndex] && item[selectedIndex].childs) {
      const objToUpdate = item[selectedIndex].childs;

      // Perform the reordering
      const removedObject = objToUpdate.splice(currentIndex, 1)[0];
      objToUpdate.splice(newIndex, 0, removedObject);

      // Update the object directly to maintain the binding
      item[selectedIndex].childs = objToUpdate;
    }
  });

  return updatedLists;
}

export function updateAccordionExpand(
  obj: Lists,
  selectedLabel: number,
  selectedDrop: number,
  accId: string,
  expand: boolean
) {
  const selectedIndex: number = +selectedLabel;

  const updatedLists = { ...obj };

  Object.keys(updatedLists).forEach((key) => {
    const allWidgets = updatedLists[key];
    const item = allWidgets.filter((widget) => widget.drop === selectedDrop);

    if (Array.isArray(item) && item[selectedIndex] && item[selectedIndex].childs) {
      const updatedWidget = { ...item[selectedIndex] };
      updatedWidget.childs.forEach((child, index) => {
        if (child.id === accId) {
          child.open = expand;
        } else {
          child.open = false;
        }
        item[selectedIndex] = updatedWidget;
      });
    }
  });

  return updatedLists;
}

export function clearContent(
  obj: Lists,
  accidx: number,
  selectedLabel: number,
  selectedDrop: number,
  objKey: string,
  langIdx: number
) {
  const selectedIndex: number = +selectedLabel;
  const updatedLists = { ...obj };

  Object.keys(updatedLists).forEach((key) => {
    const allWidgets = updatedLists[key];
    const item = allWidgets.filter((widget) => widget.drop === selectedDrop);

    if (Array.isArray(item) && item[selectedIndex] && item[selectedIndex].childs) {
      const updatedWidget = { ...item[selectedIndex] };
      if (updatedWidget.childs[accidx].attributes[objKey]) {
        const objToUpdate = updatedWidget.childs[accidx].attributes[objKey];
        if (!objToUpdate.translate) {
          objToUpdate.value.forEach((langValue: any) => {
            langValue.val.length = 0;
          });
        } else {
          objToUpdate.value[langIdx].val.length = 0;
        }
      }

      item[selectedIndex] = updatedWidget;
    }
  });

  return updatedLists;
}

export function updateValuePropStyle(
  obj: Lists,
  newValue: string,
  selectedLabel: number,
  selectedDrop: number,
  objKey: string,
  index: number
) {
  const selectedIndex: number = +selectedLabel;

  const updatedLists = { ...obj };

  Object.keys(updatedLists).forEach((key) => {
    const allWidgets = updatedLists[key];
    const item = allWidgets.filter((widget) => widget.drop === selectedDrop);

    if (Array.isArray(item) && item[selectedIndex] && item[selectedIndex].childs) {
      const updatedWidget = { ...item[selectedIndex] };

      // Check if the object at objKey exists in the current widget
      if (updatedWidget.style[objKey]) {
        const objToUpdate = updatedWidget.style[objKey];

        // Check if the index is within the range of the value array
        if (objToUpdate.value[index] !== undefined) {
          objToUpdate.value[index] = newValue;
        }
      }

      item[selectedIndex] = updatedWidget;
    }
  });

  return updatedLists;
}

export const modifyProductWidgets = (widgets: IWidget[]): IWidget[] => {
  const modifiedWidgets: IWidget[] = widgets;
  modifiedWidgets.forEach((widget) => {
    // Loop through each prop in the widget
    widget.childs.forEach((child, cIndex) => {
      // Loop through each object in the accordion content
      Object.values(child.attributes).forEach((obj) => {
        if (!obj.template) {
          const newValue = getWidgets().find((w) => w.label.id === widget.label.id)?.childs[cIndex]
            .attributes[obj.feId].value;
          obj.value = newValue || [];
        } else if (obj.valueType === 'keyValue') {
          obj.value.forEach((objLang) => {
            objLang.val.forEach((keyVal, kIndex) => {
              if (!obj.keyValueTemp[kIndex].keyTemp) {
                keyVal.key = '';
              }
              if (!obj.keyValueTemp[kIndex].valueTemp) {
                keyVal.value = '';
              }
            });
          });
        }
      });
    });
  });
  return modifiedWidgets;
};

export const modifyProductWidget = (widget: IWidget): IWidget => {
  const modifiedWidget: IWidget = widget;
  // Loop through each prop in the widget
  modifiedWidget.childs.forEach((child, cIndex) => {
    // Loop through each object in the accordion content
    Object.values(child.attributes).forEach((obj) => {
      if (!obj.template) {
        const newValue = getWidgets().find((w) => w.label.id === widget.label.id)?.childs[cIndex]
          .attributes[obj.feId].value;
        obj.value = newValue || [];
      } else if (obj.valueType === 'keyValue') {
        obj.value.forEach((objLang) => {
          objLang.val.forEach((keyVal, kIndex) => {
            if (!obj.keyValueTemp[kIndex].keyTemp) {
              keyVal.key = '';
            }
            if (!obj.keyValueTemp[kIndex].valueTemp) {
              keyVal.value = '';
            }
          });
        });
      }
    });
  });

  return modifiedWidget;
};

export const modifyTemplateWidgets = (widgets: IWidget[], tempWidgets: IWidget[]): IWidget[] => {
  let tempWidget: IWidget | undefined = {
    id: '',
    name: '',
    order: 0,
    drop: 0,
    category: '',
    company: '',
    label: {
      id: '',
      name: '',
      color: '',
    },
    open: false,
    childs: [],
    style: {},
  };
  const components = _components.map((component) => component.label.id);
  const modifiedWidgets: IWidget[] = widgets;
  modifiedWidgets.forEach((widget) => {
    if (widget.label.id === 'customwidget') {
      tempWidget = tempWidgets.find(
        (tW) =>
          tW.childs[0]?.attributes?.Custom_ID?.value?.[0].val?.[0] ===
          widget.childs[0].attributes.Custom_ID.value[0].val[0]
      );
    } else if (widget.label.id === 'labels') {
      tempWidget = tempWidgets.find(
        (tW) =>
          tW.childs[0]?.attributes?.Label_ID?.value?.[0].val?.[0] ===
          widget.childs[0].attributes.Label_ID.value[0].val[0]
      );
    } else if (components.includes(widget.label.id)) {
      tempWidget = tempWidgets.find((tW) => tW.id === widget.id);
    } else {
      tempWidget = tempWidgets.find((tW) => tW.label.id === widget.label.id);
    }
    widget.childs.forEach((child, cIndex) => {
      Object.values(child.attributes).forEach((obj) => {
        if (tempWidget !== undefined) {
          if (!obj.template) {
            const newValue = tempWidget?.childs[cIndex].attributes[obj.feId].value;
            obj.value = newValue || [];
          } else if (obj.valueType === 'keyValue') {
            obj.value.forEach((objLang, lIndex) => {
              objLang.val.forEach((keyVal, kIndex) => {
                if (!obj.keyValueTemp[kIndex].keyTemp) {
                  keyVal.key =
                    tempWidget?.childs?.[cIndex]?.attributes?.[obj.feId]?.value?.[lIndex]?.val?.[
                      kIndex
                    ]?.key || '';
                  obj.keyValueTemp[kIndex].keyTemp =
                    tempWidget?.childs?.[cIndex]?.attributes?.[obj.feId]?.keyValueTemp?.[kIndex]
                      ?.keyTemp || obj.keyValueTemp[kIndex].keyTemp;
                }
                if (!obj.keyValueTemp[kIndex].valueTemp) {
                  keyVal.value =
                    tempWidget?.childs?.[cIndex]?.attributes?.[obj.feId]?.value?.[lIndex]?.val?.[
                      kIndex
                    ]?.value || '';
                  obj.keyValueTemp[kIndex].valueTemp =
                    tempWidget?.childs?.[cIndex]?.attributes?.[obj.feId]?.keyValueTemp?.[kIndex]
                      ?.valueTemp || obj.keyValueTemp[kIndex].valueTemp;
                }
              });
            });
          }
        } else if (!obj.template) {
          const newValue = getWidgets().find((w) => w.label.id === widget.label.id)?.childs[cIndex]
            .attributes[obj.feId].value;
          obj.value = newValue || [];
        } else if (obj.valueType === 'keyValue') {
          obj.value.forEach((objLang) => {
            objLang.val.forEach((keyVal, kIndex) => {
              if (!obj.keyValueTemp[kIndex].keyTemp) {
                keyVal.key = '';
              }
              if (!obj.keyValueTemp[kIndex].valueTemp) {
                keyVal.value = '';
              }
            });
          });
        }
      });
    });
  });
  return modifiedWidgets;
};

export const modifyTemplateMapWidget = (prodWidget: IWidget, tempWidget: IWidget): IWidget => {
  const modifiedWidget: IWidget = prodWidget;
  // Loop through each prop in the widget
  modifiedWidget.childs.forEach((child, cIndex) => {
    // Loop through each object in the accordion content
    Object.values(child.attributes).forEach((obj) => {
      if (obj.valueType === 'keyValue') {
        const tempObj = tempWidget?.childs?.[cIndex]?.attributes?.[obj.feId];
        tempObj.value.forEach((objLang, lIndex) => {
          objLang.val.forEach((keyVal, kIndex) => {
            if (obj.value[lIndex].val?.[kIndex]) {
              if (obj.keyValueTemp[kIndex].keyTemp) {
                obj.value[lIndex].val[kIndex].key = keyVal.key;
              }
              if (obj.keyValueTemp[kIndex].valueTemp) {
                obj.value[lIndex].val[kIndex].value = keyVal.value;
              }
            } else {
              obj.value[lIndex].val.push(keyVal);
              obj.keyValueTemp.push(tempObj.keyValueTemp[kIndex]);
            }
          });
        });
      } else if (obj.template) {
        obj.value = tempWidget.childs[cIndex].attributes[obj.feId].value;
      }
    });
  });

  return modifiedWidget;
};

export const modifyCompareWidgets = (
  widgets: IWidget[],
  templateWidgets: IWidget[]
): [IWidget[], IWidget[]] => {
  const modifiedWidgets: IWidget[] = widgets;
  const modifiedTempWidgets: IWidget[] = templateWidgets;
  modifiedWidgets.forEach((widget, wIndex) => {
    widget.childs.forEach((accordion, cIndex) => {
      Object.values(accordion.attributes).forEach((obj) => {
        if (!obj.template) {
          obj.value = [];
        } else if (obj.valueType === 'keyValue') {
          obj.value.forEach((objLang) => {
            objLang.val.forEach((keyVal, kIndex) => {
              if (!obj.keyValueTemp[kIndex].keyTemp) {
                keyVal.key = '';
              }
              if (!obj.keyValueTemp[kIndex].valueTemp) {
                keyVal.value = '';
              }
            });
          });
        }
        const tempObj = modifiedTempWidgets[wIndex]?.childs[cIndex]?.attributes[obj.feId];
        if (tempObj !== undefined) {
          if ((!obj.template && tempObj?.template) || !tempObj?.template) {
            tempObj.template = false;
            tempObj.value = [];
          } else if (tempObj.valueType === 'keyValue') {
            tempObj.value.forEach((objLang) => {
              objLang.val.forEach((keyVal, kIndex) => {
                if (
                  (!obj?.keyValueTemp?.[kIndex]?.keyTemp &&
                    tempObj?.keyValueTemp?.[kIndex]?.keyTemp) ||
                  !tempObj?.keyValueTemp?.[kIndex]?.keyTemp
                ) {
                  keyVal.key = '';
                  tempObj.keyValueTemp[kIndex].keyTemp = false;
                }
                if (
                  (!obj?.keyValueTemp?.[kIndex]?.valueTemp &&
                    tempObj?.keyValueTemp?.[kIndex]?.valueTemp) ||
                  !tempObj?.keyValueTemp?.[kIndex]?.valueTemp
                ) {
                  keyVal.value = '';
                  tempObj.keyValueTemp[kIndex].valueTemp = false;
                }
              });
            });
          }
        }
      });
    });
  });
  return [modifiedWidgets, modifiedTempWidgets];
};

export const closeAccordions = (widgets: IWidget[]): IWidget[] => {
  const modifiedWidgets: IWidget[] = widgets;
  modifiedWidgets.forEach((widget) => {
    widget.open = false;
    widget.childs.forEach((accordion) => {
      // Loop through each object in the accordion content
      accordion.open = false;
    });
  });
  return modifiedWidgets;
};

type LangProps = {
  id: string;
  widget: string;
  order: number;
  drop: number;
  accidx: number;
  key: string;
  idx: number;
  text: string;
  translatedText: string;
  isKey: boolean;
  isValue: boolean;
  template: boolean;
};

export const getLangData = (widgets: any, sourceLang: string, targetLang: string): LangProps[] => {
  const data: LangProps[] = [];

  Object.keys(widgets).forEach((widgetKey) => {
    const widgetList = widgets[widgetKey];
    // Pass language as an object with property "value" (adjust if needed)
    let lang = updateLanguageIndex(sourceLang);

    widgetList.forEach((widgetInstance: any, widx: number) => {
      const order = widx;
      widgetInstance.childs.forEach((accordion: any, accidx: number) => {
        const objects = accordion.attributes;
        Object.keys(objects).forEach((propKey) => {
          const { translate, value, template, keyValueTemp } = objects[propKey];
          if (translate) {
            value[lang]?.val.forEach((val: any, index: number) => {
              const baseId = `${widgetInstance.id}${accidx}${propKey}${index}`;
              const widgetName = widgetInstance.name;
              const widgetDrop = widgetInstance.drop;
              if (typeof val === 'object' && val !== null) {
                // Only push if key is filled
                if (val.key && String(val.key).trim() !== '') {
                  data.push({
                    id: `${baseId}key`,
                    widget: widgetName,
                    order,
                    drop: widgetDrop,
                    accidx,
                    key: propKey,
                    idx: index,
                    text: val.key,
                    translatedText: '',
                    isKey: true,
                    isValue: false,
                    template: keyValueTemp[index].keyTemp
                  });
                }
                // Only push if value is filled
                if (val.value && String(val.value).trim() !== '') {
                  data.push({
                    id: `${baseId}val`,
                    widget: widgetName,
                    order,
                    drop: widgetDrop,
                    accidx,
                    key: propKey,
                    idx: index,
                    text: val.value,
                    translatedText: '',
                    isKey: false,
                    isValue: true,
                    template: keyValueTemp[index].valueTemp
                  });
                }
              } else if (val && String(val).trim() !== '') {
                data.push({
                  id: baseId,
                  widget: widgetName,
                  order,
                  drop: widgetDrop,
                  accidx,
                  key: propKey,
                  idx: index,
                  text: val,
                  translatedText: '',
                  isKey: false,
                  isValue: false,
                  template
                });
              }
            });
          }
        });
      });
    });

    // Now update with target language translations.
    lang = updateLanguageIndex(targetLang);
    widgetList.forEach((widgetInstance: any) => {
      widgetInstance.childs.forEach((accordion: any, accidx: number) => {
        const objects = accordion.attributes;
        Object.keys(objects).forEach((propKey) => {
          const { translate, value } = objects[propKey];
          if (translate) {
            value[lang]?.val.forEach((val: any, index: number) => {
              const baseId = `${widgetInstance.id}${accidx}${propKey}${index}`;
              if (typeof val === 'object' && val !== null) {
                data.forEach((row) => {
                  if (row.id === `${baseId}key`) {
                    row.translatedText = val.key;
                  }
                  if (row.id === `${baseId}val`) {
                    row.translatedText = val.value;
                  }
                });
              } else {
                data.forEach((row) => {
                  if (row.id === baseId) {
                    row.translatedText = val;
                  }
                });
              }
            });
          }
        });
      });
    });
  });

  return data;
};

export function updateLanguageIndex(language: string): number {
  const langMapping: Record<string, number> = {
    en: 0,
    de: 1,
    es: 2,
    fr: 3,
    it: 4,
  };
  return langMapping[language] ?? 0;
}

export function reverseLanguageIndex(index: number): string {
  const reverseMapping: Record<number, string> = {
    0: 'en',
    1: 'de',
    2: 'es',
    3: 'fr',
    4: 'it',
  };
  return reverseMapping[index] ?? 'en';
}

export const addNewLang = (widgetList: Lists): Lists => {
  const allLang: string[] = ['en', 'de', 'es', 'fr', 'it'];
  const allWidgetsMock = getWidgets();
  const allCompMock = _components;
  Object.keys(widgetList).forEach((key) => {
    const widgets = widgetList[key];
    const modifiedWidgets: IWidget[] = widgets;
    modifiedWidgets.forEach((widget, widgetIdx) => {
      // Loop through each prop in the widget
      const widgetMock = allWidgetsMock.find((mock) => mock.label.id === widget.label.id);
      const compMock = allCompMock.find((mock) => mock.label.id === widget.label.id);
      widget.childs.forEach((child, childIdx) => {
        // Loop through each object in the accordion content
        const objects = child.attributes;
        Object.keys(objects).forEach((propKey) => {
          const attribute = objects[propKey];
          allLang.forEach((lang: string) => {
            const langIdx = updateLanguageIndex(lang);
            if (attribute.value && typeof attribute.value[langIdx] === 'undefined') {
              if (widgetMock && widgetMock.childs[childIdx].attributes[propKey]) {
                const newValue = widgetMock.childs[childIdx].attributes[propKey].value[langIdx];
                objects[propKey].value[langIdx] = newValue;
              }
              if (compMock && compMock.childs[childIdx].attributes[propKey]) {
                const newValue = compMock.childs[childIdx].attributes[propKey].value[langIdx];
                objects[propKey].value[langIdx] = newValue;
              }
            }
          });
        });
      });
    });
  });
  return widgetList;
};

export async function fetchCoordinatesOrigin(
  country: string,
  city: string
): Promise<[number, number]> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?countrycodes=${country}&city=${encodeURIComponent(
        city
      )}&format=json`,
      {
        headers: {
          'User-Agent': 'Origin/1.0 (it@cirelis.de)',
        },
      }
    );
    const data = await response.json();
    if (data && data.length > 0) {
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    }
    return [0, 0];
  } catch (error:any) {
    console.error('Geocoding error:', error);
    return [0, 0];
  }
}

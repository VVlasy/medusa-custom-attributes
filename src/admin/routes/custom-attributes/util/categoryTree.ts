import { Attribute } from "./use-admin-delete-attribute";

// TreeNode definition
class TreeNode {
    name: string;
    attributes: Attribute[];
    subcategories: TreeNode[];
  
    constructor(name: string) {
      this.name = name;
      this.attributes = [];
      this.subcategories = [];
    }
  
    addAttribute(attribute: Attribute): void {
      this.attributes.push(attribute);
    }
  
    addSubcategory(subcategory: TreeNode): void {
      this.subcategories.push(subcategory);
    }
  }
  
  // Group attributes by their categories
  function groupByCategory(attributes: Attribute[]): Record<string, Attribute[]> {
    const categoryMap: Record<string, Attribute[]> = {};
  
    attributes.forEach((attribute) => {
      attribute.categories.forEach((category) => {
        if (!categoryMap[category.name]) {
          categoryMap[category.name] = [];
        }
        categoryMap[category.name].push(attribute);
      });
    });
  
    return categoryMap;
  }
  
  // Recursively build the category tree
  function buildCategoryTree(
    categoryMap: Record<string, Attribute[]>,
    categoryName: string
  ): TreeNode {
    const node = new TreeNode(categoryName);
  
    if (categoryMap[categoryName]) {
      categoryMap[categoryName].forEach((attribute) => {
        node.addAttribute(attribute);
  
        attribute.categories.forEach((subcategory) => {
          if (subcategory.name !== categoryName) {
            const subNode = buildCategoryTree(categoryMap, subcategory.name);
            node.addSubcategory(subNode);
          }
        });
      });
    }
  
    return node;
  }
  
  // Main function to create the tree from a list of attributes
  export function createCategoryTree(attributes: Attribute[]): TreeNode {
    const categoryMap = groupByCategory(attributes);
  
    // Assuming there is a root category to start from
    const rootCategoryName = "root"; // Change this to your root category name
    const root = buildCategoryTree(categoryMap, rootCategoryName);
  
    return root;
  }
  
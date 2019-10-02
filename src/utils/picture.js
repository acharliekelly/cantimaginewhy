// Model for custom image properties

export const pictModel = customProps => {
  const obj = {
    title: customProps['caption'],
    description: customProps['alt']
  }
  return obj;
}


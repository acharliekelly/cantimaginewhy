import faunadb, { query as q } from 'faunadb';

// const sample = {
//   "public_id": "art/midwinter",
//   "version": 1580146743,
//   "format": "jpg",
//   "width": 3809,
//   "height": 2715,
//   "type": "upload",
//   "created_at": "2020-01-27T17:39:03Z",
//   "context": {
//     "custom": {
//       "album": "Scenery",
//       "alt": "Night view from Blue Heron Bridge, mid-winter",
//       "caption": "Midwinter",
//       "key": "midwinter",
//       "location": "Watertown, MA",
//       "medium": "acrylic on panel",
//       "original": "available",
//       "price": "200",
//       "size": "7\" x 5\"",
//       "year": "2019"
//     }
//   }
// }

// temp
const tempKey = 'fnADs9HJMnACEiN3T80lttIEwjcCwy_LDuW9h8Hg';

const serverClient = new faunadb.serverClient({ secret: tempKey});

export const getArtwork = cloudId => {
  return serverClient.query(
    q.Get(
      q.Match(q.Index("artworks_id"), cloudId)
    )
  )
};

const toFauna = cloudImg => {
  const fData = {
    cloud_id: cloudImg.public_id,
    "copy-protect": cloudImg.public_id.startsWith('art/'),
    format: cloudImg.format,
    width: cloudImg.width,
    height: cloudImg.height
  };

  if (cloudImg.context && cloudImg.context.custom) {
    cloudImg.context.custom.forEach(key => {
      fData[key] = cloudImg.context.custom[key]
    })
  }

  return fData;
}

// copy Cloudinary data to Fauna
export const createArtwork = cloudImg => {
  const fData = toFauna(cloudImg);
  
  return serverClient.query(
    q.Create(
      q.Collection('artworks'),
      { data: fData }
    )
  );
}

export const updateArtwork = cloudImg => {
  const fData = toFauna(cloudImg);
  return serverClient.query(
    q.Update(
      q.Select("ref",
        q.Get(
          q.Match(q.Index("artworks_id"), cloudImg.public_id)
        )
      ),
      {
        data: fData
      }
    )
  )
}

// insert or update
export const upsertArtwork = cloudImg => {
  if (getArtwork(cloudImg.public_id)) {
    return updateArtwork(cloudImg);
  } else {
    return createArtwork(cloudImg);
  }
}
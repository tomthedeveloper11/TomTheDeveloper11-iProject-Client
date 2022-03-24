// const video = document.getElementById('videoInput')

// Promise.all([
//     faceapi.nets.faceRecognitionNet.loadFromUri('/assets/models'),
//     faceapi.nets.faceLandmark68Net.loadFromUri('/assets/models'),
//     faceapi.nets.ssdMobilenetv1.loadFromUri('/assets/models') 
// ]).then(start)

// function start() {

//     console.log(video);

//     document.body.append('Models Loaded')

//     navigator.getUserMedia(
//         {video: {}},
//         stream => video.srcObject = stream,
//         err => console.log(err)
//     )
    
//     recognizeFaces()
// }


// async function recognizeFaces() {
//     const labeledDescriptors = await loadLabeledImages()
//     document.body.append(' Green Light')
//     const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6)

//     video.addEventListener('play', () => {
//         const canvas = faceapi.createCanvasFromMedia(video)

//         document.querySelector('.modal-body').append(canvas)

//         // document.body.append(canvas)

//         const displaySize = {
//             width: video.width,
//             height: video.height
//         }

//         faceapi.matchDimensions(canvas, displaySize)

//         setInterval(async () => {
//             const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors()

//             const resizedDetections = faceapi.resizeResults(detections, displaySize)
//             canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

//             const results = resizedDetections.map((d) => {
//                 return faceMatcher.findBestMatch(d.descriptor)
//             })
//             console.log(results[0].label)
//             results.forEach((result, i) => {
//                 const box = resizedDetections[i].detection.box
//                 const drawBox = new faceapi.draw.DrawBox(box, {label: result.toString()})
//                 drawBox.draw(canvas)
//             })

//         }, 100)
//     })
// }


// function loadLabeledImages() {
//     // const labels = ['Black Widow', 'Captain America', 'Hawkeye' , 'Jim Rhodes', 'Tony Stark']
//     const labels = ['Captain America', 'Tony Stark', 'Thor', 'Tommy']
//     // const labels = ['Tommy']
//     return Promise.all(
//         labels.map(async (label) => {
//             const descriptions = []
//             for (let i = 1; i <= 2; i++) {
//                 const img = await faceapi.fetchImage(`/assets/labeled_images/${label}/${i}.jpg`)

//                 const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
//                 descriptions.push(detections.descriptor)
//             }
//             return new faceapi.LabeledFaceDescriptors(label, descriptions)
//         })
//     )
// }